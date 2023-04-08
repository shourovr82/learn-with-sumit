import React from "react";
import SingleAssignmentMark from "../../../components/Assignments/SingleAssignmentMark";
import { useGetAssignmentMarkQuery } from "../../../redux/features/assignment/assignmentApi";

const AssignmentMark = () => {

  const { data: marks, isLoading, isError } = useGetAssignmentMarkQuery()


  let content;
  if (isLoading) {
    content = <div>Loading...</div>
  }
  if (!isLoading && isError) {
    content = <div>There was an error occured</div>
  }
  if (!isLoading && !isError && marks.length === 0) {
    content = <div>No Assignment Found</div>
  }
  if (!isLoading && !isError && marks.length > 0) {
    content = marks.map(mark => <SingleAssignmentMark mark={mark} key={Math.random()} />)
  }


  const pending = marks?.filter(p => p?.status === "pending")
  const sent = marks?.filter(p => p?.status === "published")


  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{marks?.length}</span>
              </li>
              <li>
                Pending <span>{pending?.length}</span>
              </li>
              <li>
                Mark Sent <span>{sent?.length}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
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

export default AssignmentMark;
