export interface Course {
  id: string;
  name: string;
  description: string; // descriptionキーを追加
  // 他のコースのプロパティ
 }

 const API_ENDPOINT = 'http://localhost:8000/el_system/api/courses/'; // Django APIのエンドポイント

 export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
 };