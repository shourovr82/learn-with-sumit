import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ImCross } from 'react-icons/im';
import { useGetQuizzesQuery } from '../../../redux/features/quiz/quizApi';
import { useForm } from 'react-hook-form';

const QuizModal = ({ quizModalOpen, setQuizModalOpen, getSingleVideo }) => {

  function closeModal() {
    setQuizModalOpen(false)
  }

  const { data: getQuizzes, isLoading, isError } = useGetQuizzesQuery();

  const filteredQuizzes = getQuizzes?.filter(singleQuiz => singleQuiz?.video_title === getSingleVideo?.title)

  // handlesubmit quiz
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // 

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleChangeBtn = ({ e, o }) => {
    const selectedAns = {
      option: o?.option,
      correct: o?.isCorrect,
      selected: e.target.checked,
      optionId: o?.id
    };

    const answerIndex = selectedAnswers.findIndex(answer => answer.optionId === o?.id);

    if (e.target.checked) {
      if (answerIndex === -1) {
        setSelectedAnswers(prevAnswers => [...prevAnswers, selectedAns]);
      } else {
        setSelectedAnswers(prevAnswers => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[answerIndex] = selectedAns;
          return updatedAnswers;
        });
      }
    } else {
      setSelectedAnswers(prevAnswers => prevAnswers.filter(answer => answer.optionId !== o?.id));
    }
  };


  const handleSubmitQuiz = () => {
    // console.log(selectedAnswers);
  }
  return (
    <>


      <Transition appear show={quizModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#0f1729] bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-7xl   transform overflow-hidden rounded-2xl bg-[#131d36] border border-[#333d52] p-6 text-left align-middle shadow-xl transition-all ">
                  <p className='absolute right-0 top-0'>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md group border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-[#2b8ec8] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <ImCross className='text-white group-hover:text-black' />
                    </button>
                  </p>
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-white"
                  >
                    Quizzes for {getSingleVideo?.title}
                  </Dialog.Title>
                  <>
                    <section className="py-6 ">
                      <div className="mx-auto max-w-7xl px-5 lg:px-0">
                        <div className="mb-8">
                          <h1 className="text-2xl font-bold">

                          </h1>
                          <p className="text-sm text-slate-200">
                            Each question contains 5 Mark
                          </p>
                        </div>
                        <div className="space-y-8 ">
                          {
                            filteredQuizzes?.length && filteredQuizzes?.map((singleQuiz, index) =>
                              <div key={Math.random()} className="quiz">
                                <h4 className="question">
                                  Quiz {index + 1}  - {singleQuiz?.question}
                                </h4>
                                <div className="space-y-8 ">


                                  <form onSubmit={handleSubmit(handleSubmitQuiz)} className="quizOptions">
                                    {
                                      singleQuiz?.options?.map((o, idx) => <label key={Math.random()}>
                                        <input onChange={(e) => handleChangeBtn({ e, o })} value={o.option} type="checkbox"
                                          id={idx} />{o.option}
                                      </label>)
                                    }
                                  </form>

                                </div>
                              </div>)
                          }

                        </div>
                        <button
                          onClick={handleSubmitQuiz}
                          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
                          Submit
                        </button>

                      </div>
                    </section>
                  </>


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default QuizModal;