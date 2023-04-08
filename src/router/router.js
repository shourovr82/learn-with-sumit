import { createBrowserRouter } from "react-router-dom";
import AddVideo from "../components/Videos/AddVideo";
import EditVideo from "../components/Videos/EditVideo";
import Home from "../pages/Common/Home";
import Main from "../components/Layouts/Main";
import AdminLogin from "../pages/adminPortal/AdminLogin/AdminLogin";
import Assignment from "../pages/adminPortal/Assignments/Assignment";
import AssignmentMark from "../pages/adminPortal/Assignments/AssignmentMark";
import DashBoard from "../pages/adminPortal/DashBoard";
import QuizzesAdmin from "../pages/adminPortal/Quizzess/QuizzesAdmin";
import VideosAdmin from "../pages/adminPortal/Videos/VideosAdmin";
import CoursePlayer from "../pages/studentPortal/Courses/CoursePlayer";
import Quiz from "../pages/studentPortal/Quiz/Quiz";
import Leaderboard from "../pages/studentPortal/Leaderboard/Leaderboard";
import StudentRegistration from "../pages/studentPortal/Authentication/StudentRegistration";
import AdminLayout from "../components/Layouts/AdminLayout";
import StudentLogIn from "../pages/studentPortal/Authentication/StudentLogIn";
import AdminRoute from "./AdminRoute";
import StudentRoute from "./StudentRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <StudentLogIn />
            },
            {
                path: '/registration',
                element: <StudentRegistration />
            },
            {
                path: '/course/:id',
                element: <StudentRoute> <CoursePlayer /> </StudentRoute>

            },
            {
                path: '/course/quiz',
                element: <StudentRoute> <Quiz /> </StudentRoute>

            },
            {
                path: '/leaderboard',
                element: < StudentRoute > <Leaderboard /> </StudentRoute >

            },

        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <AdminLogin />,
            },
            {
                path: '/admin/dashboard',
                element: <AdminRoute> <DashBoard /></AdminRoute>
            },
            {
                path: '/admin/videos',
                element: <AdminRoute> <VideosAdmin /></AdminRoute>
            },
            {
                path: '/admin/quiz',
                element: <AdminRoute> <QuizzesAdmin /></AdminRoute>
            },
            {
                path: '/admin/assignment',
                element: <AdminRoute> <Assignment /></AdminRoute>
            },
            {
                path: '/admin/assignmentmark',
                element: <AdminRoute> <AssignmentMark /></AdminRoute>
            },
            {
                path: '/admin/addVideo',
                element: <AdminRoute> <AddVideo /></AdminRoute>
            },
            {
                path: '/admin/editVideo/:id',
                element: <AdminRoute>  <EditVideo /> </AdminRoute>
            },
        ]
    }
])