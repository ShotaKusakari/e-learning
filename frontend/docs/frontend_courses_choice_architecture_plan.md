# Eラーニングアプリ フロントエンド開発計画

## 概要

EラーニングアプリのフロントエンドをNext.js (TypeScript)、Tailwind CSS、Material UIで構築します。

## 技術スタック

*   Next.js (TypeScript)
*   Tailwind CSS
*   Material UI
*   Server Actions

## ディレクトリ構造

```
frontend/
├── src/                 # ソースコード
│   ├── components/        # UIコンポーネント
│   │   ├── CourseCard.tsx  # コースカード
│   │   ├── Question.tsx    # 問題コンポーネント
│   │   └── Result.tsx      # 結果表示コンポーネント
├── app/                 # app router
│   ├── user/              # 一般ユーザー
│   │   ├── page.tsx          # コース選択画面
│   │   ├── courses/
│   │   │   ├── [courseId]/
│   │   │   │   └── page.tsx  # 問題出題画面
│   │   ├── result/
│   │   │   └── page.tsx      # 結果確認画面
│   │   ├── api/             # API routes
│   │   │   ├── courses/       # コース関連API
│   │   │   │   └── actions.ts # Server Actions
│   │   │   ├── questions/     # 問題関連API
│   │   │   │   └── actions.ts # Server Actions
│   │   │   └── answers/       # 回答関連API
│   │   │       └── actions.ts # Server Actions
├── styles/            # スタイル
│   └── globals.css     # グローバルスタイル
│   └── tailwind.config.js # Tailwind CSS設定
├── public/            # 静的ファイル
│   └── logo.svg        # ロゴ
└── .env.local        # 環境変数
```

## コンポーネント設計

*   CourseCard: コースの情報を表示するコンポーネント。コース名、説明、画像などを含む。
*   Question: 問題を表示するコンポーネント。問題文、選択肢、解説などを含む。
*   Result: 結果を表示するコンポーネント。正解数、不正解数、スコア、解説などを含む。

## API連携

*   Server Actionsを使用して、サーバーサイドの処理をコンポーネント内で直接実行します。
*   問題の回答送信などにServer Actionsを使用します。
*   Django APIのエンドポイントを呼び出してデータを取得します。
*   データ構造はJson形式で受け渡しを行います。
*   コース選択画面のAPIリクエスト中はローディング表示を行います。
*   DjangoのAPIのパスは`el_system/api/courses`で始めます。

## コース選択画面

*   初期表示の段階で`useEffect`でバックエンドの`courses`テーブルのデータ全てを取得してきて、その分をカードのような表示機構で表示します。
*   コース名、説明を表示して、始めるボタンを押すと問題出題画面に遷移します。

## スタイリング

*   Tailwind CSSをメインに使用し、Material UIは特別なところでしか使わない方向で考えています。