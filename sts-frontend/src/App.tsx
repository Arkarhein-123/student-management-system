import { createBrowserRouter, Navigate, RouterProvider, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

// Main Master Frame Layout
import RootLayout from "./components/layout/RootLayout";

// Public Base Pages
import GuestLandingPage from "./pages/GuestLandingPage";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import UserProfileSettings from "./features/auth/pages/UserProfileSettings";

// 🧑‍🎓 Student Workspace Pages
import StudentDashboardHome from "./pages/StudentDashboardHome";
import StudentEnrolledTracksPage from "./features/enrollments/pages/StudentEnrolledTracksPage";
import StudentCourseDetailsPage from "./features/courses/pages/StudentCourseDetailsPage";
import StudentPaymentPage from "./features/payment/pages/StudentPaymentPage";
import ClassroomHubPage from "./features/classroom/pages/ClassroomHubPage";

// 🧑‍🏫 Teacher Workspace Pages
import TeacherDashboardHome from "./pages/TeacherDashboardHome";
import TeacherBatchRosterPage from "./features/batches/pages/TeacherBatchRosterPage";

// 🛠️ Admin Operational Hubs
import AdminDashboardHome from "./pages/AdminDashboardHome";
import AdminManageCoursesPage from "./features/courses/pages/AdminManageCoursesPage";
import AdminManageBatchesPage from "./features/batches/pages/AdminManageBatchesPage";
import AdminManageEnrollmentsPage from "./features/enrollments/pages/AdminManageEnrollmentsPage";
import { AdminManageUsersPage } from "./features/auth/pages/AdminManageUsersPage";

// --- 🏠 SMART ROOT INDEX COMPONENT ---
// Redirects authenticated users to their home workspace, or renders Guest page for guests
function RootIndex() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const userRole = useAuthStore((state) => state.userRole);

    if (isLoggedIn) {
        if (userRole === "ROLE_STUDENT") return <Navigate to="/student" replace />;
        if (userRole === "ROLE_TEACHER") return <Navigate to="/teacher" replace />;
        if (userRole === "ROLE_ADMIN") return <Navigate to="/admin" replace />;
    }

    return <GuestLandingPage />;
}

// --- 🛡️ SECURE ROLE-GUARD WRAPPER COMPONENT ---
interface GuardProps {
    allowedRoles: Array<"ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN">;
}

function SecurityGuard({ allowedRoles }: GuardProps) {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const userRole = useAuthStore((state) => state.userRole);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    if (userRole && !allowedRoles.includes(userRole as any)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
}

// --- 🛡️ PUBLIC-ONLY SHIELD COMPONENT ---
// Re-routes logged-in users back to their respective dashboards if they try to access /login or /register
function PublicOnlyGuard() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const userRole = useAuthStore((state) => state.userRole);

    if (isLoggedIn) {
        if (userRole === "ROLE_STUDENT") return <Navigate to="/student" replace />;
        if (userRole === "ROLE_TEACHER") return <Navigate to="/teacher" replace />;
        if (userRole === "ROLE_ADMIN") return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}

// --- 🗺️ REGISTER ROUTING MATRIX TREE ---
const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            // 🌐 Public Routes open to all guests (RootIndex handles guest vs logged-in navigation)
            { path: "/", element: <RootIndex /> },
            { path: "/profile", element: <UserProfileSettings /> },
            {
                path: "/unauthorized",
                element: (
                    <div className="p-12 text-center">
                        <h2 className="text-3xl font-bold text-red-500">403 - Access Denied</h2>
                        <p className="text-slate-500 mt-1">Your security token clearance level is insufficient.</p>
                    </div>
                ),
            },

            // 🔐 Routes reserved ONLY for unauthenticated visitors
            {
                element: <PublicOnlyGuard />,
                children: [
                    { path: "/login", element: <Login /> },
                    { path: "/register", element: <Register /> },
                ],
            },

            // 🧑‍🎓 Protected Student Routes
            {
                element: <SecurityGuard allowedRoles={["ROLE_STUDENT"]} />,
                children: [
                    { path: "/student", element: <StudentDashboardHome /> },
                    { path: "/student/courses/:id", element: <StudentCourseDetailsPage /> },
                    { path: "/student/enrolled", element: <StudentEnrolledTracksPage /> },
                    { path: "/student/classroom/:batchId", element: <ClassroomHubPage /> },
                    { path: "/student/payment/", element: <StudentPaymentPage /> },
                ],
            },

            // 🧑‍🏫 Protected Teacher Routes
            {
                element: <SecurityGuard allowedRoles={["ROLE_TEACHER"]} />,
                children: [
                    { path: "/teacher", element: <TeacherDashboardHome /> },
                    { path: "/teacher/batches/:id", element: <TeacherBatchRosterPage /> },
                ],
            },

            // 🛠️ Protected Admin Routes
            {
                element: <SecurityGuard allowedRoles={["ROLE_ADMIN"]} />,
                children: [
                    { path: "/admin", element: <AdminDashboardHome /> },
                    { path: "/admin/courses", element: <AdminManageCoursesPage /> },
                    { path: "/admin/batches", element: <AdminManageBatchesPage /> },
                    { path: "/admin/enrollments", element: <AdminManageEnrollmentsPage /> },
                    { path: "/admin/users", element: <AdminManageUsersPage /> },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
