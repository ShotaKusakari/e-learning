from django.urls import path
from .views import CourseListAPIView, RandomQuestionAPIView

urlpatterns = [
    path('api/courses/', CourseListAPIView.as_view(), name='course-list'),
    path('api/fe/questions/', RandomQuestionAPIView.as_view(), name='random-question'),
]