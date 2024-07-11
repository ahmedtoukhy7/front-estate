import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import ListPage from "./components/ListPage/ListPage"
import SinglePage from './components/SinglePage/SinglePage';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { AuthContextProvier } from "./context/authContext";
import Protected from "./components/Protected/Protected";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import AddPost from "./components/AddPost/AddPost";
import { PostContextProvider } from "./context/postContext";

import About from "./components/About/About";
import Searchbar from "./components/Searchbar/Searchbar";


function App() {

  const routes =createBrowserRouter([

    { path:'/', element: <Layout/>  , children : [
      {index:true , element :<Home/> },
      {path : '/about', element: <About/>},
      {path : '/list', element: <Protected><ListPage/></Protected>},
      {path : '/profile', element: <Protected><Profile/></Protected>},
      {path : '/', element: <Protected><Searchbar/></Protected>},
      {path : '/profile/update', element: <Protected><UpdateProfile/></Protected>},
      {path : '/profile/add', element: <Protected><AddPost/></Protected>},
     
      {path:'/list/:id',element: <Protected><SinglePage/></Protected>},
      {path : '/register', element:<Register/>},
      {path : '/login', element:<Login/>},
    ]
     
   }
  ])

  return<>
  <AuthContextProvier>
  
  
    <PostContextProvider>
  <RouterProvider router={routes}/>
   </PostContextProvider>


  </AuthContextProvier>

  
  </>
}

export default App