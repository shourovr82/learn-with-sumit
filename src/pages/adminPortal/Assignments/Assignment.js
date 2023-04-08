import React, { useState } from "react";
import SingleAssignment from "../../../components/Assignments/SingleAssignment";
import { useGetAssignmentQuery } from "../../../redux/features/assignment/assignmentApi";
import AddAssignmentModal from "../../../components/modal/Assignment/AddAssignmentModal";

const Assignment = () => {
  const { data: allAssignments, isLoading, isError } = useGetAssignmentQuery()
  const [isOpen, setIsOpen] = useState(false)

  let content;
  if (isLoading) {
    content = <div>Loading...</div>
  }
  if (!isLoading && isError) {
    content = <div>There was an error occured</div>
  }
  if (!isLoading && !isError && allAssignments.length === 0) {
    content = <div>No Assignment Found</div>
  }
  if (!isLoading && !isError && allAssignments.length > 0) {
    content = allAssignments.map(assignment => <SingleAssignment assignment={assignment} key={assignment.id} />)
  }


  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button onClick={() => setIsOpen(true)} type="button" className="btn !py-2 ml-auto">Add Assignment</button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
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
      </section >
      {/* add assignment modal */}
      {
        isOpen && < AddAssignmentModal isOpen={isOpen} setIsOpen={setIsOpen} />
      }
    </>
  );
};

export default Assignment;
