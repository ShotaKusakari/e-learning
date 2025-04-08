# Next.js プロジェクト作成計画

## 概要

C:\self_study\e-learning 直下に Next.js プロジェクトを作成し、TypeScript、Tailwind CSS、Material UI を使用し、app router で、ディレクトリ名を frontend にします。

## ディレクトリ構造

```
e-learning/
  frontend/          # Next.js プロジェクトのルートディレクトリ
    app/             # app router を使用
      page.tsx       # トップページのコンポーネント
      layout.tsx     # ルートレイアウト
    components/      # 再利用可能なコンポーネント
    styles/          # Tailwind CSS の設定やグローバルスタイル
      globals.css
    public/          # 静的ファイル (画像など)
    next.config.js   # Next.js の設定ファイル
    package.json     # npm の設定ファイル
    tsconfig.json    # TypeScript の設定ファイル
```

## 手順

1.  **Dockerfile の作成:** Node.js の Docker イメージをベースにした `Dockerfile` を作成します。このファイルには、必要な依存関係のインストールや、Next.js プロジェクトのビルド手順などが含まれます。`WORKDIR` を設定し、`package.json` と `package-lock.json` (または `yarn.lock`) をコンテナにコピーし、`npm install` を実行する手順を含めます。
2.  **docker-compose.yml の作成:** `docker-compose.yml` ファイルを作成し、`Dockerfile` を使用して Node.js サービスを定義します。また、必要に応じて、他のサービス (例: データベース) も定義します。
3.  **`.dockerignore` の作成:** 不要なファイルやディレクトリ (例: `node_modules`) を Docker イメージに含めないように、`.dockerignore` ファイルを作成します。
4.  **Docker イメージのビルド:** `docker-compose build` コマンドを使用して、Docker イメージをビルドします。
5.  **Docker コンテナの起動:** `docker-compose up` コマンドを使用して、Docker コンテナを起動します。
6.  **フロントエンド側の仮想環境の作成:** Docker コンテナ内で、Node.js のバージョンを管理するために `nvm` を使用します。
7.  **Next.js プロジェクトの作成:** `create-next-app` コマンドを使用して、必要な設定で Next.js プロジェクトを作成します。
8.  **Tailwind CSS の設定:** Tailwind CSS をインストールし、`tailwind.config.js` と `globals.css` を設定します。
9.  **Material UI の設定:** Material UI をインストールし、必要なコンポーネントをインポートして使用できるようにします。
10. **ディレクトリ構造の作成:** 上記のディレクトリ構造を作成し、必要なファイルを配置します。
11. **初期コンポーネントの作成:** トップページ (`app/page.tsx`) とルートレイアウト (`app/layout.tsx`) の初期コンポーネントを作成します。