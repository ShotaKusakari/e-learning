from .repositories import get_all_courses, get_random_question
import logging

logger = logging.getLogger(__name__)

def get_course_list_data():
    try:
        logger.debug("Start getting course list data...")
        courses = get_all_courses()
        logger.debug("Successfully retrieved course list data")
        return courses
    except Exception as e:
        logger.error(f"Error while getting course list data: {e}")
        return None

def get_random_question_data(course_id):
    try:
        logger.debug("Start getting random question data...")
        question = get_random_question(course_id)
        logger.debug("Successfully retrieved random question data")
        return question
    except Exception as e:
        logger.error(f"Error while getting random question data: {e}")
        return None