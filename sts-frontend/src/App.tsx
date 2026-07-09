import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import StudentDashboardHome from "./features/enrollments/pages/StudentDashboardHome";
import StudentCourseCatalogPage from "./features/courses/pages/StudentCourseCatalogPage";
import StudentEnrolledPrograms from "./features/enrollments/pages/StudentEnrolledPrograms";
import UserProfileSettings from "./features/auth/pages/UserProfileSettings";
import GuestLandingPage from "./components/pages/GuestLandingPage";

const router = createBrowserRouter([
    {
        // 🌐 One master layout to rule them all
        element: <RootLayout />,
        children: [
            // Public Pages
            { path: "/", element: <GuestLandingPage /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },

            // Student Pages
            { path: "/student", element: <StudentDashboardHome /> },
            { path: "/student/courses", element: <StudentCourseCatalogPage /> },
            { path: "/student/enrolled", element: <StudentEnrolledPrograms /> },

            // User Settings
            { path: "/profile", element: <UserProfileSettings /> },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
