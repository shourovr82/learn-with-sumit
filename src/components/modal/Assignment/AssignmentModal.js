import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ImCross } from 'react-icons/im';
import { get, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAddAssignmentMarkMutation, useGetAssignmentMarkQuery } from '../../../redux/features/assignment/marksApi';



const AssignmentModal = ({ setIsOpen, isOpen, selectedAssignment, getSingleVideo }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [submitAssignment] = useAddAssignmentMarkMutation()
  function closeModal() {
    setIsOpen(false)
  }
  const { user } = useSelector(state => state?.auth)

  const { data: singleMark } = useGetAssignmentMarkQuery()
  const singleMarkFind = singleMark?.find(mark => mark?.student_id === user?.id)



  // submit assignment---------------
  const handleSubmitAssignment = (data) => {
    const createdDate = new Date();
    const formatTimeStamp = createdDate.toISOString();
    const assignmentData = {
      student_id: user?.id,
      student_name: user?.name,
      assignment_id: selectedAssignment?.id,
      title: selectedAssignment?.video_title,
      createdAt: formatTimeStamp,
      totalMark: selectedAssignment?.totalMark,
      mark: 0,
      repo_link: data?.repo_link,
      status: "pending"
    }
    submitAssignment(assignmentData)
    toast.success('Submitted Successfully')
    setIsOpen(false)
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
                    {
                      singleMarkFind?.status !== 'pending' && singleMarkFind?.status !== 'published' && <Dialog.Title
                        as="h3"
                        className="text-2xl font-medium leading-6 text-white"
                      >
                        <span className='text-[#38bdf8]'> এসাইনমেন্ট</span> জমা দিন
                      </Dialog.Title>
                    }

                    {singleMarkFind?.status === 'pending' && singleMarkFind?.student_id === user?.id &&
                      <h4>আপনি ইতোমধ্যে এসাইনমেন্ট সাবমিট করে ফেলেছেন  । এসাইনমেন্ট  এর মার্ক এর অপেক্ষা করুন ।</h4>
                    }

                    {singleMarkFind?.status === 'published' && singleMarkFind?.student_id === user?.id &&

                      <h4 className='text-lg mt-10'>

                        আপনি এই এসাইনমেন্ট এ  {singleMarkFind?.mark} মার্ক পেয়েছেন </h4>
                    }
                    <div className="mt-5">
                      {singleMarkFind?.status !== 'pending' && singleMarkFind?.status !== 'published' &&
                        <form onSubmit={handleSubmit(handleSubmitAssignment)}>

                          {/* assignment repo link here */}
                          <div className='mt-3'>
                            <label htmlFor="repo_link" className='text-sm text-slate-400'>গিটহাব রিপোসিটরি লিঙ্ক <span className='text-[#eb6465]'>*</span> </label>
                            <input {...register("repo_link", { required: 'Github Repository link is needed' })} type="text" id='repo_link' className='rounded-md   mt-2 placeholder:text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-[#114a72] ring-inset focus:border-0 focus:outline-none p-2 w-full bg-[#1e293b]' placeholder='Assignment Title...' />
                            {
                              errors?.repo_link && <p className='rounded px-2 py-0.5 text-sm mt-1 bg-red-500'>{errors?.repo_link?.message}</p>
                            }
                          </div>


                          {/*  assignment submit */}

                          <div className='mt-5 '>

                            <button className='!bg-[#0284c7] font-semibold font-sans hover:!bg-[#32aeec] px-5 py-2 rounded-full' type='submit'>এসাইনমেন্ট জমা দিন </button>
                          </div>

                        </form>}
                    </div>


                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div >
  );
};

export default AssignmentModal;