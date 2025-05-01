"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Modal, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import ResultModal from '@/components/ResultModal';
import { fetchNextQuestion, fetchQuestion } from '@/apis/question';
import { Question, Choice } from '@/apis/question';

import { useParams } from 'next/navigation';

const QuestionPage = () => {
  const { courseId } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const data = await fetchQuestion(courseId as string);
        console.info('Fetched question data:', data);
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question data:', error);
        // TODO: エラーハンドリング
      }
    };
    fetchQuestionData();
  }, []);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
    setIsAnswered(true);
  }

  const handleSubmit = () => {
    const selectedChoice = question?.choices?.find(choice => choice.id === selectedAnswer);
    if (selectedChoice?.is_correct === true) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setModalOpen(true);
  };

  const handleNextQuestion = async () => {
    try {
      const data = await fetchQuestion(courseId as string);
      setQuestion(data);
    } catch (error) {
      console.error('Error fetching question data:', error);
      // TODO: エラーハンドリング
    }
    setModalOpen(false);
    window.scrollTo(0, 0); // 画面を一番上に遷移
    setSelectedAnswer(''); // ラジオボタンの選択を解除
    setIsAnswered(false); // 回答済みの状態をリセット
  };

  const handleCoursesSelect = () => {
    router.push(`/user`);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '24px',
        width: '70%'
      }}>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingLeft: '15%',
          paddingRight: '15%'
        }}>
          <Typography variant="body1" component="div">
            【問題】 {question?.question_text || ''}
          </Typography>
          <div style={{ width: '100%' }}>
            {Array.isArray(question?.image_url) ? (
              question.image_url.map((url, index) => (
                <img
                  key={index}
                  src={url || ''}
                  alt={`問題画像`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    marginBottom: '16px' // 画像間の縦方向の余白
                  }}
                />
              ))
            ) : (
              question?.image_url && <img
                src={question?.image_url || ''}
                alt="問題画像"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            )}
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={selectedAnswer}
              onChange={handleAnswerChange}
            >
              {question?.choices?.map((choice) => (
                <FormControlLabel
                  key={choice.id}
                  value={choice.id}
                  control={<Radio />}
                  label={choice.choice_text}
                  sx={{
                    display: 'block',
                    textAlign: 'left',
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit} disabled={!isAnswered}>
            回答する
          </Button>
        </CardContent>
      </Card>
      <ResultModal
        open={modalOpen}
        onClose={handleCloseModal}
        isCorrect={isCorrect}
        correctAnswer={question?.choices?.find(choice => choice.is_correct)?.choice_text || ''}
        onNextQuestion={handleNextQuestion}
        onCoursesSelect={handleCoursesSelect}
      />
    </div>
  );
};

export default QuestionPage;