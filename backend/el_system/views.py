from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CourseSerializer, QuestionSerializer
from .services import get_course_list_data, get_random_question_data
import logging

logger = logging.getLogger(__name__)

class CourseListAPIView(APIView):
    def get(self, request):
        try:
            courses = get_course_list_data()
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error while processing CourseListAPIView: {e}")
            return Response({"error": "Internal Server Error"}, status=500)

class RandomQuestionAPIView(APIView):
    def post(self, request):
        try:
            course_id = request.data.get('courseId')
            question = get_random_question_data(course_id)
            serializer = QuestionSerializer(question)
            logger.debug(f"Serializer data: {serializer.data}")
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error while processing RandomQuestionAPIView: {e}")
            return Response({"error": "Internal Server Error"}, status=500)
