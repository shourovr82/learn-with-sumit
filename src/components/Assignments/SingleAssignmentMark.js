import moment from 'moment/moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEditAssignmentMarkMutation } from '../../redux/features/assignment/marksApi';
import { toast } from 'react-hot-toast';

const SingleAssignmentMark = ({ mark: gettingMark }) => {

    const { id, student_name, title, createdAt, totalMark, mark, repo_link, status } = gettingMark;
    const { register, handleSubmit } = useForm();

    const outputFormat = "DD MMM YYYY hh:mm:ss A";


    const [editAssignmentMark] = useEditAssignmentMarkMutation();


    const handleEditMark = (data) => {
        const submitAssignmentLink = {
            ...data,
            status: "published"
        }
        editAssignmentMark({ id, submitAssignmentLink })
        toast.success('Successfully mark given')
    }

    return (
        <tr>
            <td className="table-td">
                {title}
            </td>
            <td className="table-td">{moment(createdAt).format(outputFormat)}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td">
                {repo_link}
            </td>
            <td className="table-td input-mark">
                {
                    status === 'pending' && <>
                        <form onSubmit={handleSubmit(handleEditMark)} action="" className='flex items-center justify-center gap-2'>
                            <input {...register("mark", { required: true })} max={100} defaultValue={totalMark} />
                            <button type='submit'>
                                <svg

                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </button>
                        </form>
                    </>

                }
                {
                    status === "published" && <>

                        <p className='text-lg text-center ml-3 font-semibold'>{mark}</p>


                    </>
                }
            </td>

        </tr >
    );
};

export default SingleAssignmentMark;