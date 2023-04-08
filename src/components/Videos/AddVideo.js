import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAddVideoMutation } from '../../redux/features/videos/videosApi';
import Swal from 'sweetalert2'

const AddVideo = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const [addVideo] = useAddVideoMutation();

    const handleAddVideo = (data) => {
        const submitVideo = {
            ...data,
            createdAt: new Date().toISOString()
        }
        addVideo(submitVideo)
        Swal.fire('Video Added Successfully')
        navigate('/admin/videos')
    }


    return (
        <div className='flex justify-center items-center mt-10'>
            <section className="p-6 flex justify-center items-center rounded-lg shadow-lg bg-gray-900 w-1/2 ">
                <form onSubmit={handleSubmit(handleAddVideo)} novalidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium text-center"> Add Video Inormation</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="firstname" className="text-sm">Video Title</label>
                                <input {...register("title", { required: true })} id="firstname" type="text" placeholder="Video Titile" className="w-full rounded-md py-2 text-black pl-1.5" />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Video Duration</label>
                                <input {...register("duration", { required: true })} id="lastname" type="text" placeholder="Duration" className="w-full rounded-md py-2 text-black pl-1.5" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Total Views</label>
                                <input {...register("views", { required: true })} id="lastname" type="text" placeholder="Total Views" className="w-full rounded-md py-2 text-black pl-1.5" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">URL</label>
                                <input  {...register("url", { required: true })} id="lastname" type="text" placeholder="Total Views" className="w-full rounded-md py-2 text-black pl-1.5" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Video Description</label>
                                <textarea {...register("description", { required: true })} id="lastname" placeholder="Video Description" className="w-full rounded-md py-2 text-black pl-1.5" />
                            </div>

                        </div>
                    </fieldset>
                    <div className='flex justify-center items-center' >
                        <button className='bg-blue-600 text-white py-2 px-8 rounded-lg w-40' >Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddVideo;