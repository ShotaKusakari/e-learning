from rest_framework import serializers
from .models import Courses, Questions, Choices, QuestionsContents, ChoicesContents

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ('id', 'name', 'description')

class ChoiceContentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoicesContents
        fields = ('id', 'contents')

class ChoiceSerializer(serializers.ModelSerializer):
    choice_contents = ChoiceContentsSerializer(many=True, read_only=True)
    class Meta:
        model = Choices
        fields = ('id', 'choice_text', 'is_correct', 'choice_contents')

class QuestionContentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionsContents
        fields = ('contents',)

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Questions
        fields = ('id', 'question_text', 'choices', 'image_url')

    def get_image_url(self, obj):
        try:
            question_content = QuestionsContents.objects.get(question_id=obj.id)
            return question_content.contents.get('image_url')
        except QuestionsContents.DoesNotExist:
            return None