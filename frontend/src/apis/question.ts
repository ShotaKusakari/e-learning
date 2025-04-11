export const fetchQuestion = async (courseId: string) => {
  // TODO: APIのエンドポイントを設定
  const API_ENDPOINT = `/el_system/api/fe/questions`;
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: courseId,
      }),
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching question data:', error);
    throw error;
  }
};

export const fetchNextQuestion = async (courseId: string, currentQuestionId: string) => {
  // TODO: APIのエンドポイントを設定
  const API_ENDPOINT = `/el_system/api/fe/next_question`;
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: courseId,
        currentQuestionId: currentQuestionId,
      }),
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching next question data:', error);
    throw error;
  }
};

