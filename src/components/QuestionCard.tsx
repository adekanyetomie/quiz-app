import React from "react";
import { AnswerObject } from '../App'

interface Props {
  question: string;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  questionNumber,
  totalQuestions,
  callback,
}) => (
  <div>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}{" "}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <div key={ answer }>
          <button disabled={!!userAnswer} onClick={callback} value={answer} >
            {" "}
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>{" "}
          </button>
        </div>
      ))}
    </div>
  </div>
);
