from .models import Courses, Questions
import logging

logger = logging.getLogger(__name__)

def get_all_courses():
    try:
        logger.debug("Getting all courses from the database")
        courses = Courses.objects.all()
        logger.debug(f"Successfully retrieved {courses.count()} courses")
        return courses
    except Exception as e:
        logger.error(f"Error while getting all courses: {e}")
        return None

def get_random_question(course_id):
    try:
        logger.debug("Getting a random question from the database")
        question = Questions.objects.filter(course_id=course_id).order_by('?').first()
        if question:
            question.choices = question.choices_set.all()
        if question:
            logger.debug(f"Successfully retrieved random question: {question.__dict__}")
        else:
            logger.warning("No questions found in the database")
        return question
    except Exception as e:
        logger.error(f"Error while getting a random question: {e}")
        return None