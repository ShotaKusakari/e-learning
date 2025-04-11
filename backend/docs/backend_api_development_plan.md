# Backend API Development Plan

## 1. プロジェクトのセットアップ

*   `e-learning/backend` ディレクトリにDjangoプロジェクトが既に存在することを確認します。
*   `docker-compose.yml` ファイルを確認し、backend, db, frontendのサービスが定義されていることを確認します。
*   必要に応じて、Docker環境を起動します (`docker-compose up -d`)。

## 2. Djangoアプリケーションの作成

*   `el_system` アプリケーションがDjangoプロジェクトに存在することを確認します。
*   存在しない場合は、`python manage.py startapp el_system` コマンドで作成します。

## 3. モデルの定義

*   `el_system/models.py` ファイルに、`Course`、`Question`、`Choice` モデルが定義されていることを確認します。
*   モデルが存在しない場合は、定義します。

## 4. シリアライザーの定義

*   `el_system/serializers.py` ファイルを作成し、`CourseSerializer`、`QuestionSerializer`、`ChoiceSerializer` を定義します。
    *   シリアライザーは、DjangoのモデルインスタンスをJSON形式に変換するために使用します。

## 5. APIビューの定義

*   `el_system/views.py` ファイルに、`CourseListAPIView` と `RandomQuestionAPIView` を定義します。
    *   `CourseListAPIView` は、`Course` モデルからすべてのレコードを取得し、シリアライザーを使ってJSON形式で返します。
        *   ORMのコード例:
            ```python
            from rest_framework import generics
            from .models import Courses
            from .serializers import CourseSerializer

            class CourseListAPIView(generics.ListAPIView):
                queryset = Courses.objects.all()
                serializer_class = CourseSerializer
            ```
    *   `RandomQuestionAPIView` は、`Question` モデルからランダムに1件のレコードを取得し、関連する `Choice` モデルのレコードを含めて、シリアライザーを使ってJSON形式で返します。
        *   ORMのコード例:
            ```python
            from rest_framework import generics
            from .models import Questions
            from .serializers import QuestionSerializer
            import random

            class RandomQuestionAPIView(generics.RetrieveAPIView):
                queryset = Questions.objects.all()
                serializer_class = QuestionSerializer

                def get_object(self):
                    questions = self.get_queryset()
                    random_question = random.choice(questions)
                    return random_question
            ```

## 6. URLの定義

*   `el_system/urls.py` ファイルを作成し、APIのエンドポイントを定義します。
    *   `'el_system/api/courses/'` エンドポイントを `CourseListAPIView` にマッピングします。
    *   `'el_system/api/fe/questions/'` エンドポイントを `RandomQuestionAPIView` にマッピングします。
*   Djangoプロジェクトの `urls.py` ファイルに、`el_system/urls.py` をインクルードします。

## 7. テストデータの作成 (fixtures)

*   `el_system/fixtures` ディレクトリを作成します。
*   `el_system/fixtures/initial_data.json` ファイルを作成し、`Course`、`Question`、`Choice` モデルのテストデータをJSON形式で記述します。
*   `python manage.py loaddata initial_data` コマンドでテストデータをデータベースにロードします。

## 8. APIのテスト

*   Dockerコンテナ内でAPIを実行している場合、以下のcurlコマンドを使用してAPIのエンドポイントをテストします。
    *   **コース一覧取得API:**
        ```bash
        curl http://localhost:<ポート番号>/el_system/api/courses/
        ```
        *   レスポンスのJSON形式:
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
    *   **ランダムな質問取得API:**
        ```bash
        curl http://localhost:<ポート番号>/el_system/api/fe/questions/
        ```
        *   レスポンスのJSON形式:
            ```json
            {
              "id": "質問ID",
              "text": "質問文",
              "choices": [
                {
                  "id": "選択肢ID",
                  "text": "選択肢のテキスト",
                  "is_correct": true/false
                },
                {
                  "id": "選択肢ID",
                  "text": "選択肢のテキスト",
                  "is_correct": true/false
                },
                ...
              ]
            }
            ```
        *   `<ポート番号>` は、`docker-compose.yml` ファイルでbackendサービスに割り当てられたポート番号に置き換えてください。

## 9. ドキュメントの作成

*   APIのエンドポイント、リクエストパラメータ、レスポンス形式などを記述したドキュメントを作成します。