# Tampermonkey-Vue

使用 Vue 開發油猴插件（Tampermonkey）。

## 安裝 Tampermonkey 插件

請在瀏覽器安裝[Tampermonkey](https://tampermonkey.net/)插件。

安裝 Tampermonkey 插件後，可以點擊插件選擇`添加新腳本`，然後複製貼上當前項目下`dist/tampermonkey-vue.user.js`的代碼，`Ctrl+S`存檔後，刷新瀏覽器即可預覽效果。

## 配置

### 本地開發

```
npm run dev
```

可以在`.env.dev`進行開發環境的配置

```js
// 插件運行環境
TAMPERMONKEY_APP_ENVIRONMENT = development
// 插件名稱
TAMPERMONKEY_APP_NAME = TamperMonkey - Vue - Dev
// 插件打包生成的文件，Tampermonkey插件的入口文件，注意格式應該為：*.user.js
TAMPERMONKEY_ENTRY_FILE = tampermonkey - vue.user.js
```

### 打包發布

```
npm run build
```

可以在`.env`進行生產環境的配置，插件的版本號使用的是`package.json`的`version`版本號。

```js
// 插件運行環境
TAMPERMONKEY_APP_ENVIRONMENT = production
// 插件名稱
TAMPERMONKEY_APP_NAME = TamperMonkey - Vue
// 插件打包生成的文件，Tampermonkey插件的入口文件，注意格式應該為：*.user.js
TAMPERMONKEY_ENTRY_FILE = tampermonkey - vue.user.js
```

打包完成後，在`dist`目錄下會生成`tampermonkey-vue.user.js`文件，把該文件添加到 Tampermonkey 即可運行。

### Tampermonkey 配置

可以在`tampermonkey.js`文件，配置 Tampermonkey 選項。
