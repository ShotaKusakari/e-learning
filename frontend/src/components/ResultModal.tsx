import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  isCorrect: boolean;
  correctAnswer: string;
  onNextQuestion: () => void;
  onCoursesSelect: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ open, onClose, isCorrect, correctAnswer, onNextQuestion, onCoursesSelect }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="result-modal-title"
      aria-describedby="result-modal-description"
    >
      <Box sx={style}>
        <Typography id="result-modal-title" variant="h6" component="h2" style={{ color: isCorrect ? 'green' : 'black' }}>
          {isCorrect ? '正解！' : '不正解...'}
        </Typography>
        <Typography id="result-modal-description" sx={{ mt: 2 }} style={{ color: isCorrect ? 'green' : 'black' }}>
          {isCorrect ? 'おめでとうございます！' : '残念でした。'}
        </Typography>
        <Typography id="result-modal-correct-answer" sx={{ mt: 2 }} >
          正解: {correctAnswer}
        </Typography>
        <Button onClick={onNextQuestion}>次の問題へ</Button>
        <Button onClick={onCoursesSelect}>コース選択へ</Button>
      </Box>
    </Modal>
  );
};

export default ResultModal;