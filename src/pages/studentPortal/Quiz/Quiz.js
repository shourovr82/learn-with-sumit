import React from "react";
import SingleQuiz from "../../../components/Quizzes/SingleQuiz";
import { useGetQuizzesQuery } from "../../../redux/features/quiz/quizApi";

const Quiz = () => {

  const { data: getQuizzes, isLoading, isError } = useGetQuizzesQuery();

  let content;
  if (isLoading) {
    content = <div> Loading...</div>
  }

  if (!isLoading && isError) {
    content = <div>There was an error occured</div>
  }

  if (!isLoading && !isError && getQuizzes.length === 0) {
    content = <div>No Quiz Found</div>
  }

  if (!isLoading && !isError && getQuizzes.length > 0) {
    content = getQuizzes.map((quiz, index) => <SingleQuiz quiz={quiz} key={Math.random()} index={index} />)
  }

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              Quizzes for "Debounce Function in JavaScript - JavaScript Job
              Interview question"
            </h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">
            {content}
          </div>
          <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default Quiz;
