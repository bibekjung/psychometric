import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QuizState = {
  currentIndex: number;
  answers: Record<string, string>;
  animating: 'none' | 'next' | 'prev';
  timeRemaining: number;
  isTimerActive: boolean;
  quizStarted: boolean;
  totalTimeElapsed: number;
  questionTimeElapsed: number;
  canGoBack: boolean;
};

const initialState: QuizState = {
  currentIndex: 0,
  answers: {},
  animating: 'none',
  timeRemaining: 60,
  isTimerActive: true,
  quizStarted: false,
  totalTimeElapsed: 0,
  questionTimeElapsed: 0,
  canGoBack: false,
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
    setTotalTimeElapsed: (state, action: PayloadAction<number>) => {
      state.totalTimeElapsed = action.payload;
    },
    setQuestionTimeElapsed: (state, action: PayloadAction<number>) => {
      state.questionTimeElapsed = action.payload;
    },
    goNext: (state) => {
      state.canGoBack = true;
      state.currentIndex += 1;
    },
    goPrev: (state) => {
      if (state.canGoBack && state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.canGoBack = false;
      }
    },
    startQuiz: (state) => {
      state.quizStarted = true;
      state.currentIndex = 0;
      state.answers = {};
      state.animating = 'none';
      state.timeRemaining = 60;
      state.isTimerActive = true;
      state.totalTimeElapsed = 0;
      state.questionTimeElapsed = 0;
      state.canGoBack = false;
    },
    resetQuiz: (state) => {
      state.currentIndex = 0;
      state.answers = {};
      state.animating = 'none';
      state.timeRemaining = 60;
      state.isTimerActive = true;
      state.quizStarted = false;
      state.totalTimeElapsed = 0;
      state.questionTimeElapsed = 0;
      state.canGoBack = false;
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
  setTotalTimeElapsed,
  setQuestionTimeElapsed,
  goNext,
  goPrev,
  startQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
