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
    borderRadius: '16px', // 角を丸く
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // よりソフトな影
    p: 4,
  };

  const resultStyle = {
    backgroundColor: isCorrect ? 'rgba(200, 250, 205, 0.9)' : 'rgba(255, 231, 217, 0.9)',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="result-modal-title"
      aria-describedby="result-modal-description"
    >
      <Box sx={style}>
        <Box sx={resultStyle}>
          <Typography
            id="result-modal-title"
            variant="h5"
            component="h2"
            style={{
              color: isCorrect ? '#2e7d32' : '#d32f2f',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '8px'
            }}
          >
            {isCorrect ? '正解！' : '不正解...'}
          </Typography>
          <Typography
            id="result-modal-description"
            sx={{ mt: 1 }}
            style={{
              color: isCorrect ? '#1b5e20' : '#c62828',
              textAlign: 'center'
            }}
          >
            {isCorrect ? 'おめでとうございます！' : '残念でした。'}
          </Typography>
        </Box>
        {isCorrect && (
          <Typography
            id="result-modal-correct-answer"
            sx={{
              mt: 2,
              mb: 3,
              p: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontWeight: 'medium'
            }}
          >
            正解: {correctAnswer}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#9e9e9e',
              color: '#616161',
              padding: '8px 24px',
              minWidth: '160px',
              '&:hover': {
                borderColor: '#757575',
                backgroundColor: '#b3b3b3',
              }
            }}
          >
            閉じる
          </Button>
          <Button
            variant="contained"
            onClick={onNextQuestion}
            sx={{
              backgroundColor: '#2196f3',
              padding: '8px 24px',
              minWidth: '160px', // 固定幅を追加
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#1976d2',
              }
            }}
          >
            次の問題へ
          </Button>
        </Box>
        {/* コース選択ボタンを追加 */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 5,
          pt: 2,
          borderTop: '1px solid #e0e0e0'
        }}>
          <Button
            variant="text"
            onClick={onCoursesSelect}
            sx={{
              color: '#757575',
              '&:hover': {
                backgroundColor: '#b3b3b3',
              }
            }}
          >
            コース選択に戻る
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ResultModal;