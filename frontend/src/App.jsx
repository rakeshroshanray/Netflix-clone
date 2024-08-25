
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/home/HomePage"
import { Home } from "lucide-react"

let route = createBrowserRouter([
  {path:'/', element:<HomePage/>},
  {path : '/login',element:<LoginPage/>},
  {path:'/signup',element:<SignUpPage/>},
])

function App() {
  
  return (
   <RouterProvider router={route}/>
  )
}

export default App
