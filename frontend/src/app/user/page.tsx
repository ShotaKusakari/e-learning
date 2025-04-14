"use client";

import { fetchCourses, Course } from '@/apis/courses';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

// const debugCourses: Course[] = [
//   { id: '1', name: 'デバッグコース1', description: 'これはデバッグコース1の説明です。' },
//   { id: '2', name: 'デバッグコース2', description: 'これはデバッグコース2の説明です。' },
//   { id: '3', name: 'デバッグコース3', description: 'これはデバッグコース3の説明です。' },
// ];

const UserPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

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

  const handleCourseClick = (courseId: string) => {
    router.push(`/user/courses/${courseId}`);
  };

  return (
    <main>
      <div>
        <Stack spacing={4} alignItems="center">
          {courses.map((course) => {
            const cardWidth = isSmallScreen ? '100%' : '80%';

            return (
              <Card key={course.id} elevation={3} style={{ width: cardWidth }} onClick={() => handleCourseClick(course.id)}>
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h4" component="div" style={{ marginBottom: '2rem', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                    {course.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{ marginBottom: '1rem' }}>
                    {course.description}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{ width: '70%' }}
                  >
                    学習を開始
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </div>
    </main>
  );
};

export default UserPage;