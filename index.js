import bodyParser from "body-parser";
import Express from "express";
import { google } from "googleapis";
require("./credential.json"); // サービスアカウントの認証情報
const app = Express();

// POSTのBODYにJSONを使うため、body-parserを有効化
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Spread Sheetに行を追加する処理
 * @param {String} spreadsheetId シートID
 * @param {String[][]} values 追記するデータ。2次元配列で指定
 */
const doAppend = async (spreadsheetId, values) => {
  // パラメタのチェック
  if (!spreadsheetId || !values) throw new Error("Error: Invalid Params");

  // Spread Sheet APIを使うための認証処理
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  const sheets = google.sheets({ version: "v4", auth });

  // APIを呼び出して、行の追加処理
  const req = {
    // シートのID
    spreadsheetId: spreadsheetId,
    // A1に追記することを指定
    range: "A1",
    // 追記する形式を指定。
    valueInputOption: "USER_ENTERED",
    // A1に値があったら下方向に空欄を探しにいく
    insertDataOption: "INSERT_ROWS",
    // 追加する行のデータ。2次元配列で指定
    resource: {
      values: values
    }
  };
  await sheets.spreadsheets.values.append(req);
};

// '/append'にアクセスしたら、doAppend関数を呼ぶようにマッピング
app.post("/append", async (req, res) => {
  try {
    // パラメタのチェック
    if (!req.body) throw new Error("Error: Empty Body");

    // パラメタの取得
    const spreadsheetId = req.body.spreadsheetId || "";
    const values = req.body.values || "";

    // 追記処理の呼び出し
    await doAppend(spreadsheetId, values);

    res.end();
  } catch (error) {
    console.error(`Error in append: ${error}`, error);
    res.status(500).send({ error: `${error}` });
  }
});
export default app;
