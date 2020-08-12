import React, { useState } from "react";
import "./App.css";
import { QuestionCard } from "./components/QuestionCard";
import { fetchQuestions, Difficulty, QuestionState } from "./api";

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const total_questions = 15;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(
      total_questions,
      Difficulty.Easy
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value; // user answer
      const correct = questions[number].correct_answer === answer; //check answer againt correct answer (true/false)
      if (correct) setScore((prev) => prev + 1); //add score if answer is correct
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }; // answer is saved in the array for user answers
      setUserAnswers((prev) => [...prev, AnswerObject]);
    }
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === total_questions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  return (
    <div className="App">
      <h1>Quiz App</h1>
      {gameOver || userAnswers.length === total_questions ? (
        <button className="start" onClick={startQuiz}>
          Start Quiz
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score:{score}</p> : null}
      {loading ? <p>Loading Questions ...</p> : null}
      {!loading && !gameOver ? (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={total_questions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== total_questions - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
}

export default App;
