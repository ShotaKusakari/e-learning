# Eラーニングシステム テーブル構造

## coursesテーブル

| 物理名      | 論理名     | データ型   | 詳細                               |
| ----------- | ---------- | -------- | ---------------------------------- |
| id          | コースID   | UUID     | UUID自動採番                           |
| name        | コース名   | Varchar  |                                    |
| description | コース詳細 | text     |                                    |
| status      | 利用状況   | enum     | (下書き, 公開, 非公開)                 |
| created_at  | 作成日時   | datetime |                                    |
| updated_at  | 更新日時   | datetime |                                    |

## questionsテーブル

| 物理名        | 論理名       | データ型   | 詳細                               |
| ----------- | ---------- | -------- | ---------------------------------- |
| id          | 問題番号ID   | UUID     | UUID自動採番                           |
| course_id   | コースID   | UUID     | coursesテーブルに外部キー結合           |
| question_text | 問題文章   | text     |                                    |
| question_type | 問題形式   | enum     | (選択式, 記述式, 穴埋め式)           |
| status      | 利用状況   | boolean  | コース状況                             |
| created_at  | 作成日時   | datetime |                                    |
| updated_at  | 更新日時   | datetime |                                    |

## choicesテーブル

| 物理名       | 論理名     | データ型   | 詳細                               |
| ----------- | ---------- | -------- | ---------------------------------- |
| id          | 回答番号ID | UUID     | UUID自動採番                           |
| questions_id | 問題ID     | UUID     | questionsテーブルに外部キー結合         |
| choice_text | 選択番号   | text     |                                    |
| is_correct  | 正誤判定   | boolean  |                                    |
| created_at  | 作成日時   | datetime |                                    |
| updated_at  | 更新日時   | datetime |                                    |

## questions_contentsテーブル

| 物理名        | 論理名       | データ型   | 詳細                               |
| ----------- | ---------- | -------- | ---------------------------------- |
| id          | 回答番号ID   | UUID     | UUID自動採番                           |
| questions_id | 問題ID       | UUID     |                                    |
| contents    | 問題補助データ | JSON     | 画像URLなど                           |
| created_at  | 作成日時   | datetime |                                    |
| updated_at  | 更新日時   | datetime |                                    |

## choices_contentsテーブル

| 物理名       | 論理名       | データ型   | 詳細                               |
| ----------- | ---------- | -------- | ---------------------------------- |
| id          | 回答番号ID   | UUID     | UUID自動採番                           |
| choices_id  | 選択肢_ID    | UUID     | choicesテーブルと外部キー結合         |
| contents    | 回答補助データ | JSON     | 画像URLなど                           |
| created_at  | 作成日時   | datetime |                                    |
| updated_at  | 更新日時   | datetime |                                    |

## Mermaid図

```mermaid
erDiagram
    courses {
        UUID id PK
        Varchar name
        text description
        enum status
        datetime created_at
        datetime updated_at
    }
    questions {
        UUID id PK
        UUID course_id FK
        text question_text
        enum question_type
        boolean status
        datetime created_at
        datetime updated_at
    }
    choices {
        UUID id PK
        UUID questions_id FK
        text choice_text
        boolean is_correct
        datetime created_at
        datetime updated_at
    }
    questions_contents {
        UUID id PK
        UUID questions_id
        JSON contents
        datetime created_at
        datetime updated_at
    }
    choices_contents {
        UUID id PK
        UUID choices_id FK
        JSON contents
        datetime created_at
        datetime updated_at
    }
    courses ||--o{ questions : has
    questions ||--o{ choices : has
    questions ||--o{ questions_contents : has
    choices ||--o{ choices_contents : has