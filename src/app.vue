<template>
  <div>
    <div style="background-color: #546d41; color: #ffffff">
      <header>上傳EXCEL輔助程式</header>
      <section>
        <div v-if="dataset.length == 0">
          <input
            type="file"
            multiple="false"
            id="sheets"
            accept="application/x-iwork-keynote-sffnumbers,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            @change="uploadexcel"
          />
        </div>
        <div v-else>
          <button type="button" @click="upload" :disabled="disabled">
            批次自動上傳
          </button>
          <div style="width: 100px; display: inline-block"></div>
          <button type="button" @click="clear">清除</button>
          <table
            width="95%"
            border="0"
            cellspacing="1"
            cellpadding="2"
            align="center"
          >
            <thead>
              <tr>
                <td bgcolor="#D0DDA8">#</td>
                <td bgcolor="#D0DDA8">種類</td>
                <td bgcolor="#D0DDA8">記錄方式</td>
                <td bgcolor="#D0DDA8">活動型態</td>
                <td bgcolor="#D0DDA8">成體行為</td>
                <td bgcolor="#D0DDA8">棲地</td>
                <td bgcolor="#D0DDA8">微棲地</td>
                <td bgcolor="#D0DDA8">數量</td>
                <td bgcolor="#D0DDA8">備註</td>
                <td bgcolor="#D0DDA8">上傳</td>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in dataset.slice().reverse()">
                <tr :key="index">
                  <td>{{ dataset.length - index }}</td>
                  <td>{{ item['蛙種'] }}</td>
                  <td>{{ item['觀察方法'] }}</td>
                  <td>{{ item['生活型態'] }}</td>
                  <td>{{ item['成體行為'] }}</td>
                  <td>{{ item['棲地'] }}</td>
                  <td>{{ item['微棲地'] }}</td>
                  <td>{{ item['數量'] }}</td>
                  <td>{{ item['memo'] }}</td>
                  <td>{{ item['status'] }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { read, utils } from 'xlsx'
export default {
  name: 'ImportExcel',
  data: () => {
    return {
      dataset: [],
      disabled: false,
    }
  },
  methods: {
    uploadexcel(e) {
      const vue = this
      var selectedFile = e.target.files[0]
      var reader = new FileReader()
      reader.onload = function (event) {
        var data = event.target.result
        var wb = read(data, { type: 'binary' })

        vue.dataset = utils.sheet_to_row_object_array(
          wb.Sheets[wb.SheetNames[0]]
        )
      }
      reader.readAsBinaryString(selectedFile)
    },
    clear() {
      this.dataset = []
    },
    async upload() {
      this.disabled = true
      for (const item of this.dataset) {
        let amount = ''
        if (item.living_type_ids == 1 || item.living_type_ids == 2) {
          amount = '不計數'
        } else {
          amount = item.amount
          if (item.observing_method_id == 1) {
            if (item['amount'] >= 10 && item['amount'] < 20) {
              amount = '10-19'
            } else if (item['amount'] >= 20 && item['amount'] < 30) {
              amount = '20-29'
            } else if (item['amount'] >= 30 && item['amount'] < 40) {
              amount = '30-39'
            } else if (item['amount'] >= 40 && item['amount'] < 50) {
              amount = '40-49'
            } else if (item['amount'] >= 50) {
              amount = '50'
            }
          }
        }
        try {
          const response = await this.$http.get('AddDetailDataGo.php', {
            params: {
              frog_id: item.frog_id,
              living_type_ids:
                item.living_type_ids == 6 ? 8 : item.living_type_ids,
              living_type_id:
                item.living_type_ids == 6 ? 8 : item.living_type_ids,
              behavior_id: item.behavior_ids - 1,
              behavior_ids: item.behavior_ids - 1,
              habitat_id: item.habitat_id,
              habitat_p1_id: item.habitat_p1_id,
              observing_method_id: item.observing_method_id,
              amount: amount,
              memo: item.memo,
              _: new Date().valueOf(),
            },
          })
          if (response.data.code != '0000') {
            this.$set(
              item,
              'status',
              `[${response.data.code}] ${response.data.message}`
            )
          } else {
            this.$set(item, 'status', 'OK')
          }

          await this.sleep(1000)
        } catch (e) {
          this.$set(item, 'status', e)
        }
      }
      this.disabled = false
      parent.main_top.location.reload()
    },
    sleep(d) {
      return new Promise(resolve => setTimeout(resolve, d))
    },
  },
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
