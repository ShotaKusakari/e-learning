# API Documentation

## コース一覧取得API

*   エンドポイント: `/el_system/api/courses/`
*   メソッド: GET
*   リクエストパラメータ: なし
*   レスポンス:

    ```json
    [
      {
        "id": "コースID",
        "name": "コース名",
        "description": "コースの説明"
      },
      {
        "id": "コースID",
        "name": "コース名",
        "description": "コースの説明"
      },
      ...
    ]
    ```

## ランダムな質問取得API

*   エンドポイント: `/el_system/api/fe/questions/`
*   メソッド: GET
*   リクエストパラメータ: なし
*   レスポンス:

    ```json
    {
      "id": "質問ID",
      "question_text": "質問文",
      "choices": [
        {
          "id": "選択肢ID",
          "choice_text": "選択肢のテキスト",
          "is_correct": true/false
        },
        {
          "id": "選択肢ID",
          "choice_text": "選択肢のテキスト",
          "is_correct": true/false
        },
        ...
      ]
    }