# 問題出題・回答後の挙動とロジック実装計画

## 概要

問題出題画面から回答を送信後の挙動とロジックを実装する。回答後、正誤結果をモーダルで表示し、次の問題へ進むか、回答解説へ進むかを選択できるようにする。回答解説画面では、APIリクエストで詳細な解説情報を取得し、次の問題へ進むか、問題を終了するかを選択できるようにする。

## 詳細

1.  **回答送信後のモーダル表示**
    *   回答ボタン押下後、正誤結果をモーダルで表示する。
    *   モーダルには以下のボタンを配置する。
        *   次の問題へ：次の問題を表示する。
        *   回答解説へ：回答解説画面へ遷移する。

2.  **回答解説画面**
    *   APIリクエストを送信して、以下の情報を取得・表示する。
        *   結果（正誤）
        *   問題文
        *   問題参考画像
        *   選択肢
        *   ユーザーが選択した選択肢
        *   解説
        *   解説参考画像
    *   画面には以下のボタンを配置する。
        *   次の問題へ：次の問題を表示する。
        *   問題を終了する：`/user`にリダイレクトする。

## 技術的な考慮事項

*   フロントエンドで正誤判定ロジックを実装する。
*   モーダルはReactコンポーネントとして実装する。
*   APIリクエストには`fetch`または`axios`を使用する。
*   画面遷移には`next/router`を使用する。

## Mermaid図

```mermaid
sequenceDiagram
    participant User
    participant QuestionPage
    participant Modal
    participant ExplanationPage
    participant API

    User->>QuestionPage: 回答を選択
    User->>QuestionPage: 回答するボタンをクリック
    QuestionPage->>QuestionPage: 正誤判定
    QuestionPage->>Modal: 結果表示
    User->>Modal: 次の問題へボタンをクリック
    Modal->>QuestionPage: 問題更新
    User->>Modal: 回答解説へボタンをクリック
    Modal->>ExplanationPage: 画面遷移
    ExplanationPage->>API: 回答解説データリクエスト
    API->>ExplanationPage: 回答解説データ
    User->>ExplanationPage: 次の問題へボタンをクリック
    ExplanationPage->>QuestionPage: 問題更新
    User->>ExplanationPage: 問題を終了するボタンをクリック
    ExplanationPage->>User: /userへリダイレクト