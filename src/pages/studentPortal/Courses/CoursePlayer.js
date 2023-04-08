import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SingleCourseVideo from "../../../components/Videos/SingleCourseVideo";
import { useGetSingleVideoQuery, useGetVideosQuery } from "../../../redux/features/videos/videosApi";
import AssignmentModal from "../../../components/modal/Assignment/AssignmentModal";
import { useGetAssignmentQuery } from "../../../redux/features/assignment/assignmentApi";
import { useGetQuizzesQuery } from "../../../redux/features/quiz/quizApi";
import moment from "moment";
import QuizModal from "../../../components/modal/Quizzes/QuizModal";

const CoursePlayer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const { data: courseVideo, isLoading, isError } = useGetVideosQuery();



  let content;
  if (isLoading) {
    content = <div>Loading...</div>
  }
  if (!isLoading && isError) {
    content = <div>There was an error occured</div>
  }
  if (!isLoading && !isError && courseVideo.length === 0) {
    content = <div>No Assignment Found</div>
  }
  if (!isLoading && !isError && courseVideo.length > 0) {
    content = courseVideo.map(video => <SingleCourseVideo video={video} key={Math.random()} />)
  }

  const { id } = useParams();
  const { data: getSingleVideo } = useGetSingleVideoQuery(id);
  const { data: allAssignment } = useGetAssignmentQuery();
  const selectedAssignment = allAssignment?.find(assignment => assignment.video_title === getSingleVideo?.title)
  const outputFormat = "DD MMM YYYY ";

  const { createdAt, description, duration, id: videoId, title, url, views } = getSingleVideo || {}
  const { data: allQuiz } = useGetQuizzesQuery()
  const selectedQuiz = allQuiz?.find(quiz => quiz.video_title === getSingleVideo?.title);

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <iframe
                width="100%"
                className="aspect-video"
                src={url}
                title={title}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
              />
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                  {title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                  Uploaded on {moment(createdAt).format(outputFormat)}
                </h2>
                <div className="flex gap-4">
                  <button onClick={() => setIsOpen(true)}
                    type="button"

                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    এসাইনমেন্ট
                  </button>
                  <button

                    onClick={() => setQuizModalOpen(true)}
                    type="button"
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    কুইজে অংশগ্রহণ করুন
                  </button>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                  {description}
                </p>
              </div>
            </div>
            <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

              {content}
            </div>
          </div>
        </div>
      </section>
      {
        isOpen && <AssignmentModal getSingleVideo={getSingleVideo} selectedAssignment={selectedAssignment} isOpen={isOpen} setIsOpen={setIsOpen} />
      }
      {
        quizModalOpen && <QuizModal getSingleVideo={getSingleVideo} quizModalOpen={quizModalOpen} setQuizModalOpen={setQuizModalOpen} />
      }
    </>
  );
};

export default CoursePlayer;
