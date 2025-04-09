"use client";

import { fetchCourses, Course } from '@/apis/courses';
import React, { useState, useEffect } from 'react';

const debugCourses: Course[] = [
  { id: '1', name: 'デバッグコース1', description: 'これはデバッグコース1の説明です。' },
  { id: '2', name: 'デバッグコース2', description: 'これはデバッグコース2の説明です。' },
  { id: '3', name: 'デバッグコース3', description: 'これはデバッグコース3の説明です。' },
];

const UserPage = () => {
  const [courses, setCourses] = useState<Course[]>(debugCourses);
/* // useEffectフックをコメントアウト
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };

    loadCourses();
  }, []);
  */

  return (
    <main>
      <div>
        <h1>
          コース一覧
        </h1>
        <div>
          {courses.map((course) => (
            <div key={course.id} className="border">
              <div>
                <h2>
                  {course.name}
                </h2>
                <p>
                  {course.description}
                </p>
                <button>
                  学習を開始
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default UserPage;