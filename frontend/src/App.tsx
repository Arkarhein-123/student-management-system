import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Guestlayout from "./components/layout/Guestlayout";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import StudentDashboardLayout from "./components/layout/StudentDashboardLayout";
import StudentDashboardHome from "./features/enrollments/pages/StudentDashboardHome";
import StudentCourseCatalogPage from "./features/courses/pages/StudentCourseCatalogPage";
import StudentEnrolledPrograms from "./features/enrollments/pages/StudentEnrolledPrograms";
import UserProfileSettings from "./features/auth/pages/UserProfileSettings";
import GuestLandingPage from "./components/pages/GuestLandingPage";

const router = createBrowserRouter([
    {
        element: <Guestlayout />,
        children: [
            { path: "/", element: <GuestLandingPage /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
    {
        element: <StudentDashboardLayout />,
        children: [
            { path: "/student", element: <StudentDashboardHome /> },
            { path: "/student/courses", element: <StudentCourseCatalogPage /> },
            { path: "/student/enrolled", element: <StudentEnrolledPrograms /> },
        ],
    },
    {
        path: "/profile",
        element: <UserProfileSettings />,
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
