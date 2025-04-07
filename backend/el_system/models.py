from django.db import models
import uuid

class Courses(models.Model):
    class Meta:
        db_table = 'courses'
        verbose_name_plural = 'courses'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField()
    STATUS_CHOICES = [
        ('draft', '下書き'),
        ('published', '公開'),
        ('unpublished', '非公開'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

class Questions(models.Model):
    class Meta:
        db_table = 'questions'
        verbose_name_plural = 'questions'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course_id = models.ForeignKey(Courses, to_field='id', db_column='course_id', on_delete=models.CASCADE)
    question_text = models.TextField()
    QUESTION_TYPE_CHOICES = [
        ('choice', '選択式'),
        ('text', '記述式'),
        ('fill', '穴埋め式'),
    ]
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES, default='choice')
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.question_text

class Choices(models.Model):
    class Meta:
        db_table = 'choices'
        verbose_name_plural = 'choices'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question_id = models.ForeignKey(Questions, to_field='id', db_column='question_id', on_delete=models.CASCADE)
    choice_text = models.TextField()
    is_correct = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.choice_text

class QuestionsContents(models.Model):
    class Meta:
        db_table = 'questions_contents'
        verbose_name_plural = 'question_contents'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question_id = models.ForeignKey(Questions, to_field='id', db_column='question_id', on_delete=models.CASCADE)
    contents = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return str(self.contents)
class ChoicesContents(models.Model):
    class Meta:
        db_table = 'choices_contents'
        verbose_name_plural = 'choices_contents'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    choice_id = models.ForeignKey(Choices, to_field='id', db_column='choice_id', on_delete=models.CASCADE)
    contents = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return str(self.contents)
