
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/home/HomePage";
import WatchPage from "./pages/WatchPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // Import Forgot Password Page
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

// Define routes with conditional rendering based on user authentication
const createRoutes = (user) => [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: user ? <Navigate to="/" /> : <LoginPage /> },
  { path: '/signup', element: user ? <Navigate to="/" /> : <SignUpPage /> },
  { path: '/watch/:id', element: user ? <WatchPage /> : <Navigate to="/login" /> },
  { path: '/forgot-password', element: user ? <Navigate to="/" /> : <ForgotPasswordPage /> }, // Forgot Password Route
  { path: '/reset-password/:token', element: <ResetPasswordPage /> },
];

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    );
  }

  const router = createBrowserRouter(createRoutes(user));

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;

