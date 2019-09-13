# Append Row API using ZEIT Now and Spread Sheet API

Append Row API using [ZEIT Now](https://zeit.co/now) and [Spread Sheet API v4](https://developers.google.com/sheets/api/?authuser=2).

![DEMO](https://github.com/memory-lovers/append-row-api_zeit-now/blob/master/img/append_sheet_api_demo.gif)

## 使い方

### API のデプロイ

#### 1. git clone

```shell
$ git clone https://github.com/memory-lovers/append-row-api_zeit-now.git
```

#### 2. サービスアカウントのキーファイルの配置

`credential.json`というファイル名で、認証情報のキーファイルを配置してください。

#### 3. 追記したいスプレッドシートの権限設定

そのままだとサービスアカウントに書き込み権限がないため、エラーになります。
そのため、追記したいスプレッドシートの共有権限にサービスアカウントを追加してください。

#### 3. ローカルで試す

`now dev`コマンドでローカルで動かすことができます。
実行すると`http://localhost:5001`で起動します。

```shell
$ now dev -p 5001
// or
$ npm run dev
```

#### 3. ZEIT now にデプロイ

`now`コマンドでデプロイできます。
プロジェクト名は、`now.json`の`name`に書いてある**append-api**になります。

```shell
$ now
// or
$ npm run deploy
```

### API の呼び出し

デプロイした API は、以下のパラメタを受け取ります

1. 追記するシートの ID: `spreadsheetId`
2. 追記する内容の配列: `values`

curl で呼び出すサンプルは以下のとおりです。
URL には、`https://append-api.memory-lovers.now.sh`のようなデプロイした URL を設定してください。
ローカルで起動した場合は、`https://localhost:5001`を設定してください。

```shell
#!/bin/bash

SHEET_ID='YOUR_SHEET_ID'
URL='API_URL'

curl -i \
-H "Accept: application/json" \
-H "Content-Type:application/json" \
-X POST --data '{ "spreadsheetId": "'$SHEET_ID'", "values": [ ["A", "B", "C"], ["D", "E", "F"] ]  }' \
"$URL/append"
```

## Licence

[MIT](https://github.com/memory-lovers/append-row-api_zeit-now/blob/master/LICENCE)

## Author

Memory Lovers ([GitHub](https://github.com/memory-lovers) / [WebSite](https://memory-lovers.com/) / [Twitter](https://twitter.com/MemoryLoverz))
kira_puka ([Twitter](https://twitter.com/kira_puka))
