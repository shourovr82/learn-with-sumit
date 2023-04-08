import React from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { BsCheckLg, BsChevronBarDown } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useGetVideosQuery } from '../../../redux/features/videos/videosApi';
import { useAddQuizMutation } from '../../../redux/features/quiz/quizApi';

const AddQuizModal = ({ setAddQuizOpen, addQuizOpen }) => {
  const [selected, setSelected] = useState({})
  const [errorVideoSelect, setErrorVideoSelect] = useState('')
  const { data: allVideos, isLoading, isError } = useGetVideosQuery()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [addQuiz] = useAddQuizMutation()

  function closeModal() {
    setAddQuizOpen(false)
  }

  const handleChangeVideoTitle = (e) => {
    setErrorVideoSelect('')
    setSelected(e)
  }

  const handleAddNewQuiz = (data) => {

    if (!selected?.id) {
      setErrorVideoSelect('যেকোনো একটা ভিডিও সিলেক্ট করতেই হবে ')
    }
    else if (selected?.id) {

      const options = [
        {
          id: 1,
          option: data?.question1,
          isCorrect: data.isCorrect1 === 'true' ? true : false
        },
        {
          id: 2,
          option: data?.question2,
          isCorrect: data.isCorrect2 === 'true' ? true : false
        },
        {
          id: 3,
          option: data?.question3,
          isCorrect: data.isCorrect3 === 'true' ? true : false
        },
        {
          id: 4,
          option: data?.question4,
          isCorrect: data.isCorrect4 === 'true' ? true : false
        },
      ]

      const newQuizData = {
        question: data.question,
        video_id: selected?.id,
        video_title: selected?.title,
        options

      }
      addQuiz(newQuizData)
      setAddQuizOpen(false)
      toast.success('Successfully Added a new Quiz')
    }
  }

  return (
    <>


      <Transition appear show={addQuizOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-[#0f1729] bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-2xl   transform overflow-hidden rounded-2xl bg-[#131d36] border border-[#333d52] p-6 text-left align-middle shadow-xl transition-all ">
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
                    নতুন কুইজ অ্যাড করুন
                  </Dialog.Title>
                  <div className="mt-5">
                    <form onSubmit={handleSubmit(handleAddNewQuiz)}>
                      <div className='mt-3'>
                        <label htmlFor="title" className='text-sm text-slate-400'>কুইজ এর ভিডিও সিলেক্ট করুন </label>

                        <div className="">
                          <Listbox value={selected && selected} onChange={handleChangeVideoTitle}>
                            <div className="relative mt-1">

                              <Listbox.Button className="relative  w-full  rounded-lg !bg-[#1e293b] py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selected?.title ? selected?.title : 'Select a Video'}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <BsChevronBarDown
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              {
                                errorVideoSelect && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errorVideoSelect}</p>
                              }
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute mt-1 h-40 w-full overflow-auto rounded-md  bg-[#131d36] py-1 text-base shadow-lg ring-1 ring-white ring-opacity-10 focus:outline-none sm:text-sm">
                                  {allVideos?.length && allVideos.map((singleVideo) => (
                                    <Listbox.Option
                                      key={Math.random()}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-1 text-sm pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-white'
                                        }`
                                      }
                                      value={singleVideo}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                              }`}
                                          >
                                            {singleVideo?.title}
                                          </span>
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                              <BsCheckLg className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>


                      {/* quiz question title here */}
                      <div className='mt-3'>
                        <label htmlFor="question" className='text-sm text-slate-400'>কুইজ এর টাইটেল লিখুন   </label>
                        <input {...register("question", { required: 'কুইজ এর টাইটেল দিতে হবে   ' })} type="text" id='question' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-full bg-[#1e293b]' placeholder='Quiz  Title...' />
                        {
                          errors?.question && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.question?.message}</p>
                        }
                      </div>









                      {/* question 1 ---------------------- */}
                      <div className='mt-3'>
                        <label htmlFor="question1" className='text-sm text-slate-400'>প্রশ্ন ১   </label>
                        <div className=' flex items-center justify-between'>
                          <input {...register("question1", { required: 'কুইজ এর প্রশ্ন দিতে হবে ' })} type="text" id='question1' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-[75%] bg-[#1e293b]' placeholder='Quiz Question...' />

                          <div className="flex  items-center gap-2">
                            <label
                              htmlFor="isCorrect1" className='text-sm mt-1.5  text-slate-400'>Correct?</label>
                            <select
                              defaultValue={true} {...register('isCorrect1')}
                              className='px-3 hover:ring-2 rounded-md  duration-300 ease-in outline-none cursor-pointer bg-[#1e293b] py-2 mt-2 text-[#818fa5]' name="isCorrect1" id="isCorrect1">
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                          </div>

                        </div>
                        {
                          errors?.question1 && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.question1?.message}</p>
                        }
                      </div>





                      {/* question 2----------------*/}
                      <div className='mt-3'>
                        <label htmlFor="question2" className='text-sm text-slate-400'>প্রশ্ন ২    </label>
                        <div className=' flex items-center justify-between'>
                          <input {...register("question2", { required: 'কুইজ এর প্রশ্ন দিতে হবে  ' })} type="text" id='question2' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-[75%] bg-[#1e293b]' placeholder='Quiz Question...' />

                          <div className="flex  items-center gap-2">
                            <label htmlFor="isCorrect2" className='text-sm mt-1.5  text-slate-400'>Correct?</label>
                            <select defaultValue={true} {...register('isCorrect2')} className='px-3 hover:ring-2 rounded-md  duration-300 ease-in outline-none cursor-pointer bg-[#1e293b] py-2 mt-2 text-[#818fa5]' name="isCorrect2" id="isCorrect2">
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                          </div>

                        </div>
                        {
                          errors?.question2 && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.question2?.message}</p>
                        }
                      </div>
                      {/* question 3------------*/}
                      <div className='mt-3'>
                        <label htmlFor="question3" className='text-sm text-slate-400'>প্রশ্ন ৩   </label>
                        <div className=' flex items-center justify-between'>
                          <input {...register("question3", { required: 'কুইজ এর প্রশ্ন দিতে হবে  ' })} type="text" id='question3' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-[75%] bg-[#1e293b]' placeholder='Quiz Question...' />

                          <div className="flex  items-center gap-2">
                            <label htmlFor="isCorrect3" className='text-sm mt-1.5  text-slate-400'>Correct?</label>
                            <select defaultValue={true} {...register('isCorrect3')} className='px-3 hover:ring-2 rounded-md  duration-300 ease-in outline-none cursor-pointer bg-[#1e293b] py-2 mt-2 text-[#818fa5]' name="isCorrect3" id="isCorrect3">
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                          </div>

                        </div>
                        {
                          errors?.question3 && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.question3?.message}</p>
                        }
                      </div>



                      {/* question 4 */}
                      <div className='mt-3'>
                        <label htmlFor="question4" className='text-sm text-slate-400'>প্রশ্ন ৪   </label>
                        <div className=' flex items-center justify-between'>
                          <input {...register("question4", { required: 'কুইজ এর প্রশ্ন দিতে হবে ' })} type="text" id='question4' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-[75%] bg-[#1e293b]' placeholder='Quiz Question...' />

                          <div className="flex  items-center gap-2">
                            <label htmlFor="isCorrect4" className='text-sm mt-1.5  text-slate-400'>Correct?</label>
                            <select defaultValue={true} {...register('isCorrect4')} className='px-3 hover:ring-2 rounded-md  duration-300 ease-in outline-none cursor-pointer bg-[#1e293b] py-2 mt-2 text-[#818fa5]' name="isCorrect4" id="isCorrect4">
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                            </select>
                          </div>

                        </div>
                        {
                          errors?.question4 && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.question4?.message}</p>
                        }
                      </div>
























                      {/*  quiz video submit */}

                      <div className='mt-5 '>
                        <button className='!bg-[#0284c7] font-semibold text-sm font-serif hover:!bg-[#32aeec] px-5 py-2 rounded-full' type='submit'>কুইজ  অ্যাড  করুন  </button>
                      </div>

                    </form>
                  </div>


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddQuizModal;