from django.contrib import admin
from .models import Courses, Questions, Choices, QuestionsContents, ChoicesContents

admin.site.register(Courses)
admin.site.register(Questions)
admin.site.register(Choices)
admin.site.register(QuestionsContents)
admin.site.register(ChoicesContents)
