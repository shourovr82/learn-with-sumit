import React from "react";
import { useSelector } from "react-redux";
import { useGetAssignmentMarkQuery } from "../../../redux/features/assignment/assignmentApi";

const Leaderboard = () => {
 const { user } = useSelector(state => state?.auth)


 const { data: getAllMarks, isError, error } = useGetAssignmentMarkQuery()
 const filteredMarks = getAllMarks?.slice()?.sort((a, b) => parseFloat(b.mark) - parseFloat(a.mark))

 const rankedData = filteredMarks?.reduce((prevValue, currentValue) => {
  const lastRank = prevValue.length > 0 ? prevValue[prevValue.length - 1].rank : 0;
  const rank = parseInt(currentValue?.mark) === (prevValue?.length > 0 ? parseInt(prevValue[prevValue.length - 1].mark) : null)
   ? lastRank
   : lastRank + 1;
  prevValue.push({ ...currentValue, rank });
  return prevValue;
 }, []);

 const loggedInUserRank = rankedData?.find(rankData => rankData?.student_id === user?.student_id)
 return (
  <>
   {
    isError && error ?
     <div className="flex justify-center items-center mt-10">
      <h2 className="text-2xl font-bold">{error?.status}</h2>
     </div>
     : <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
       <div>
        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
         <thead>
          <tr>
           <th className="table-th !text-center">Rank</th>
           <th className="table-th !text-center">Name</th>
           <th className="table-th !text-center">Quiz Mark</th>
           <th className="table-th !text-center">Assignment Mark</th>
           <th className="table-th !text-center">Total</th>
          </tr>
         </thead>
         <tbody>
          <tr className="border-2 border-cyan">
           <td className="table-td text-center font-bold">{loggedInUserRank?.rank}</td>
           <td className="table-td text-center font-bold">{user?.name}</td>
           <td className="table-td text-center font-bold">0</td>
           <td className="table-td text-center font-bold">{loggedInUserRank?.mark}</td>
           <td className="table-td text-center font-bold">{loggedInUserRank?.totalMark}</td>
          </tr>
         </tbody>
        </table>
       </div>
       <div className="my-8">
        <h3 className="text-lg font-bold">Top {getAllMarks?.length} Result</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
         <thead>
          <tr className="border-b border-slate-600/50">
           <th className="table-th !text-center">Rank</th>
           <th className="table-th !text-center">Name</th>
           <th className="table-th !text-center">Quiz Mark</th>
           <th className="table-th !text-center">Assignment Mark</th>
           <th className="table-th !text-center">Total</th>
          </tr>
         </thead>
         <tbody>

          {rankedData?.length && rankedData?.map((singleMark, idx) =>
           <tr key={Math.random()} className="border-b border-slate-600/50">
            <td className="table-td text-center">
             {singleMark?.rank}
            </td>
            <td className="table-td text-center">{singleMark?.student_name || 'Student Name'}</td>
            <td className="table-td text-center">0</td>
            <td className="table-td text-center">{singleMark?.mark}</td>
            <td className="table-td text-center">100</td>
           </tr>
          )}

         </tbody>
        </table>
       </div>
      </div>
     </section>
   }

  </>
 );
};

export default Leaderboard;
