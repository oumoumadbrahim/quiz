import {createSlice} from '@reduxjs/toolkit';
import questionsApi from '../api/questions.json';

const initialState = {
  questions: questionsApi,
  currentQuestion: 0,
  currentResponse: null,
  selectedIndexAnswer: null,
  score: 0,
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    increment: state => {
      state.score += 1;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    nextQuestion: state => {
      state.currentQuestion += 1;
      state.currentResponse = null;
      state.selectedIndexAnswer = null;
    },
    resetQuiz: state => {
      state.currentQuestion = 0;
      state.score = 0;
      state.currentResponse = null;
    },
    setAnswer: (state, action) => {
      state.selectedIndexAnswer = action.payload.index;
      state.currentResponse = action.payload.correct;
    },
  },
});

export const {increment, setQuestions, nextQuestion, resetQuiz, setAnswer} =
  quizSlice.actions;

export default quizSlice.reducer;
