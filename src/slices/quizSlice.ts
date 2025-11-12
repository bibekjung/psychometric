import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QuizState = {
  currentIndex: number;
  answers: Record<string, string>;
  animating: 'none' | 'next' | 'prev';
  timeRemaining: number;
  isTimerActive: boolean;
};

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  animating: 'none',
  timeRemaining: 30,
  isTimerActive: true,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setAnswers: (state, action: PayloadAction<Record<string, string>>) => {
      state.answers = action.payload;
    },
    updateAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answerId: string }>,
    ) => {
      state.answers[action.payload.questionId] = action.payload.answerId;
    },
    setAnimating: (state, action: PayloadAction<'none' | 'next' | 'prev'>) => {
      state.animating = action.payload;
    },
    setTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload;
    },
    setIsTimerActive: (state, action: PayloadAction<boolean>) => {
      state.isTimerActive = action.payload;
    },
    goNext: (state) => {
      state.currentIndex += 1;
    },
    goPrev: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    resetQuiz: (state) => {
      state.currentIndex = 0;
      state.answers = {};
      state.animating = 'none';
      state.timeRemaining = 30;
      state.isTimerActive = true;
    },
  },
});

export const {
  setCurrentIndex,
  setAnswers,
  updateAnswer,
  setAnimating,
  setTimeRemaining,
  setIsTimerActive,
  goNext,
  goPrev,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
