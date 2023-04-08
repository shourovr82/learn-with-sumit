import React from 'react';
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { BsCheckLg, BsChevronBarDown } from 'react-icons/bs';
import { useGetVideosQuery } from '../../../redux/features/videos/videosApi';
import { useForm } from 'react-hook-form';
import { useAddAssignmentMutation, useGetAssignmentQuery } from '../../../redux/features/assignment/assignmentApi';
import { toast } from 'react-hot-toast';
// import { Listbox, Transition } from '@headlessui/react'



const AddAssignmentModal = ({ setIsOpen, isOpen }) => {
  const [selected, setSelected] = useState({})
  const [errorVideoSelect, setErrorVideoSelect] = useState('')
  const { data: allVideos, isLoading, isError } = useGetVideosQuery()
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [addAssignment] = useAddAssignmentMutation()
  const { data: allAssignments } = useGetAssignmentQuery();
  function closeModal() {
    setIsOpen(false)
  }

  const handleChangeVideoTitle = (e) => {
    setErrorVideoSelect('')
    setSelected(e)
  }

  const handleAddNewAssignment = (data) => {
    const submittedAssignment = allAssignments?.filter(singleAssignment => singleAssignment?.video_title === selected?.title)

    if (!selected?.id) {
      setErrorVideoSelect('যেকোনো একটা ভিডিও সিলেক্ট করতেই হবে ')
    }
    else if (selected?.id) {
      if (submittedAssignment?.length) {
        setErrorVideoSelect('আপনি ইতোমধ্যে এই ভিডিওতে এসাইনমেন্ট অ্যাড করেছেন  ')
        return;
      } else if (!submittedAssignment?.length) {
        const newAssignmentData = {
          title: data.assignmentTitle,
          video_id: selected?.id,
          video_title: selected?.title,
          totalMark: Number(data?.assignmentMark)
        }
        addAssignment(newAssignmentData)
        toast.success('Successfully Added new assignment')
        setIsOpen(false)
      }
    }

  }



  return (
    <div>
      <>


        <Transition appear show={isOpen} as={Fragment}>
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
                      নতুন এসাইনমেন্ট অ্যাড করুন
                    </Dialog.Title>
                    <div className="mt-5">
                      <form onSubmit={handleSubmit(handleAddNewAssignment)}>
                        <div className='mt-3'>
                          <label htmlFor="title" className='text-sm text-slate-400'>এসাইনমেন্ট এর ভিডিও সিলেক্ট করুন</label>

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


                        {/* assignment title here */}
                        <div className='mt-3'>
                          <label htmlFor="assignmentTitle" className='text-sm text-slate-400'>এসাইনমেন্ট এর টাইটেল লিখুন   </label>
                          <input {...register("assignmentTitle", { required: 'এসাইনমেন্ট এর টাইটেল লেখা  বাধ্যতামূলক ' })} type="text" id='title' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-full bg-[#1e293b]' placeholder='Assignment Title...' />
                          {
                            errors?.assignmentTitle && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.assignmentTitle?.message}</p>
                          }
                        </div>
                        {/* assignment mark  here */}
                        <div className='mt-3'>
                          <label htmlFor="assignmentMark" className='text-sm text-slate-400'>এসাইনমেন্ট এর মার্ক </label>
                          <input
                            {...register("assignmentMark",
                              {
                                required: 'এসাইনমেন্ট এর মার্ক দিতে হবে',
                                pattern: {
                                  value: /^[1-9][0-9]?$|^100$/,
                                  message: 'এসাইনমেন্ট এর মার্ক সর্বোচ্চ ১০০ এর ভেতর দিতে হবে '
                                }
                              })}
                            type="number" id='assignmentMark' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-full bg-[#1e293b]' placeholder='Assignment Mark...' />
                          {
                            errors?.assignmentMark && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.assignmentMark?.message}</p>
                          }
                        </div>

                        {/*  assignment video submit */}

                        <div className='mt-5 '>

                          <button className='!bg-[#0284c7] font-bold font-serif hover:!bg-[#32aeec] px-5 py-2 rounded-full' type='submit'>এসাইনমেন্ট অ্যাড  করুন  </button>
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
    </div>
  );
};

export default AddAssignmentModal;