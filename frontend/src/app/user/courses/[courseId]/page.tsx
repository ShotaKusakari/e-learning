"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, Modal, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import ResultModal from '@/components/ResultModal';
import { fetchNextQuestion, fetchQuestion } from '@/apis/question';

const debugQuestion = {
  id: '1',
  text: '正しい選択肢を選んでください。',
  imageUrl: 'https://el-system-images.s3.ap-southeast-2.amazonaws.com/スクリーンショット%202025-04-07%20114735.png',
  choices: [
    { id: '1', text: '1,2', is_correct: true },
    { id: '2', text: '1,3', is_correct: false },
    { id: '3', text: '2,1', is_correct: false },
    { id: '4', text: '2,3', is_correct: false },
    { id: '5', text: '3,1', is_correct: false },
    { id: '6', text: '3,2', is_correct: false },
  ],
};

const QuestionPage = () => {
  const [question, setQuestion] = useState(debugQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchQuestionData = async () => {
  //     try {
  //       const data = await fetchQuestion(question.id);
  //       setQuestion(data);
  //     } catch (error) {
  //       console.error('Error fetching question data:', error);
  //       // TODO: エラーハンドリング
  //     }
  //   };
  //   fetchQuestionData();
  // }, []);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
    setIsAnswered(true);
  }

  const handleSubmit = () => {
    const selectedChoice = question.choices.find(choice => choice.id === selectedAnswer);
    if (selectedChoice?.is_correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setModalOpen(true);
  };

  const handleNextQuestion = async () => {
    try {
      const data = await fetchQuestion(question.id);
      setQuestion(data);
    } catch (error) {
      console.error('Error fetching question data:', error);
      // TODO: エラーハンドリング
    }
    setModalOpen(false);
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
            【問題】 {question.text}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {question.imageUrl && <img
              src={question.imageUrl}
              alt="問題画像"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />}
          </div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={selectedAnswer}
              onChange={handleAnswerChange}
            >
              {question.choices.map((choice) => (
                <FormControlLabel
                  key={choice.id}
                  value={choice.id}
                  control={<Radio />}
                  label={choice.text}
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
        correctAnswer={question.choices.find(choice => choice.is_correct)?.text || ''}
        onNextQuestion={handleNextQuestion}
        onCoursesSelect={handleCoursesSelect}
      />
    </div>
  );
};

export default QuestionPage;