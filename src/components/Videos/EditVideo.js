import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useEditVideoMutation, useGetSingleVideoQuery } from '../../redux/features/videos/videosApi';
const EditVideo = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()
    const { id } = useParams();
    const videoId = id;


    const [editVideo] = useEditVideoMutation()

    const { data: singleVideo } = useGetSingleVideoQuery(videoId)

    const handleEditVideo = (data) => {
        const submitVideo = {
            ...data
        }
        editVideo({ videoId, submitVideo })
        navigate('/admin/videos')
        Swal.fire('Video has edited done.')
    }

    return (
        <div className='flex justify-center items-center mt-10'>
            <section className="p-6 flex justify-center items-center rounded-lg shadow-lg bg-gray-900 w-1/2 ">
                <form onSubmit={handleSubmit(handleEditVideo)} novalidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium text-center"> Add Video Inormation</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="firstname" className="text-sm">Video Title</label>
                                <input defaultValue={singleVideo?.title} {...register("title", { required: true })} id="firstname" type="text" placeholder="Video Titile" className="w-full rounded-md py-2 text-black " />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Video Description</label>
                                <input defaultValue={singleVideo?.description} {...register("description", { required: true })} id="lastname" type="text" placeholder="Video Description" className="w-full rounded-md py-2 text-black" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Video Duration</label>
                                <input defaultValue={singleVideo?.duration} {...register("duration", { required: true })} id="lastname" type="text" placeholder="Duration" className="w-full rounded-md py-2 text-black" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Total Views</label>
                                <input defaultValue={singleVideo?.views} {...register("views", { required: true })} id="lastname" type="text" placeholder="Total Views" className="w-full rounded-md py-2 text-black" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">URL</label>
                                <input defaultValue={singleVideo?.url} {...register("url", { required: true })} id="lastname" type="text" placeholder="Total Views" className="w-full rounded-md py-2 text-black" />
                            </div>

                            {/* <div className="col-span-full sm:col-span-3">
                        <label for="email" className="text-sm">Email</label>
                        <input id="email" type="email" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 " />
                    </div>
                    <div className="col-span-full">
                        <label for="address" className="text-sm">Address</label>
                        <input id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 0" />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                        <label for="city" className="text-sm">City</label>
                        <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 " />
                    </div> */}
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

export default EditVideo;