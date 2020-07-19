# craco-storybook-alias

Используется для добавления alias'ов в craco и storybook. Импортируется в ```craco.config.js``` и в ```.storybook/main.js```.

## Настройка

* Установить [craco](https://www.npmjs.com/package/@craco/craco#installation) и [storybook](https://storybook.js.org/docs/guides/guide-react/)
* Добавить библиотеку в ```src/lib```
* Прописать импорт в ```src/lib/index.js```
* Добавить код в ```craco.config.js```

```js
+const path = require('path');
+const { alias } = require('./src/lib');

+const aliasForCraco = {}

+for(let key in alias) {
+  aliasForCraco[key] = path.resolve(
+    __dirname,
+    './src/' + alias[key]
+  );
+}

module.exports = {
+  webpack: { alias: { ...aliasForCraco } }
};
```

* Добавить код в ```.storybook/main.js```

```js
+const path = require('path');
+const { alias } = require('../src/lib');

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
+  webpackFinal(config) {
+    const aliasForStorybook = {};
+
+    for(let key in alias) {
+      aliasForStorybook[key] = path.resolve(
+        __dirname,
+        '../src/' + alias[key]
+      );
+    }
+
+    config.resolve.alias = {
+      ...config.resolve.alias,
+     ...aliasForStorybook
+    };
+
+    return config;
+  },
};
```

* Теперь можно добавлять алиасы в ```src/lib/alias.js```, например вот так

```js
const path = require('path');

module.exports = {
  alias: {
+    '@styles': './styles',
+    '@ui': './ui',
  }
};
```
