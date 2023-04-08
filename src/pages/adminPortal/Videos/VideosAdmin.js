import React from "react";
import { Link } from "react-router-dom";
import SingleVideo from "../../../components/Videos/SingleVideo";
import { useGetVideosQuery } from "../../../redux/features/videos/videosApi";

const VideosAdmin = () => {

  const { data: videos, isLoading, isError } = useGetVideosQuery();

  let content;
  if (isLoading) {
    content = <div>Loading...</div>
  }
  if (!isLoading && isError) {
    content = <div>There was an error occured</div>
  }
  if (!isLoading && !isError && videos.length === 0) {
    content = <div>No Assignment Found</div>
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map(video => <SingleVideo video={video} key={video.id} />)
  }


  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <Link to="/admin/addVideo" >
              <div className="w-full flex">
                <button className="btn ml-auto">Add Video</button>
              </div>
            </Link>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {content}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideosAdmin;
