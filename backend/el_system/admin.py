from django.contrib import admin
from .models import Courses, Questions, Choices, QuestionsContents, ChoicesContents
from django.contrib import admin

class CoursesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'status', 'created_at', 'updated_at')

class QuestionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'course_id', 'question_text', 'question_type', 'status', 'created_at', 'updated_at')

class ChoicesAdmin(admin.ModelAdmin):
    list_display = ('id', 'question_id', 'choice_text', 'is_correct', 'created_at', 'updated_at')

class QuestionsContentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'question_id', 'contents', 'created_at', 'updated_at')

class ChoicesContentsAdmin(admin.ModelAdmin):
    list_display = ('id', 'choice_id', 'contents', 'created_at', 'updated_at')

admin.site.register(Courses, CoursesAdmin)
admin.site.register(Questions, QuestionsAdmin)
admin.site.register(Choices, ChoicesAdmin)
admin.site.register(QuestionsContents, QuestionsContentsAdmin)
admin.site.register(ChoicesContents, ChoicesContentsAdmin)
