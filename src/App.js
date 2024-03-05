import { Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Explore from './pages/Explore';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Support from "./pages/Support"
import Category from "./pages/Category"
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import ForgotPass from './pages/ForgotPass';
import CreateListing from "./pages/CreateListings"
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Listing from './pages/Listing';
import Contact from './pages/Contact';



function App() {
  return (
    <>
        <BrowserRouter>
                {/* Common Components */}
                <Routes>
                  <Route path="/" element={<Explore/>}/>

                  <Route path="/signin" element={<SignIn/>}/>

                  <Route path="/signup" element={<SignUp/>}/>

                  <Route path="/profile" element=   
                    {<PrivateRoute/>}>
                    <Route path='/profile' element={<Profile/>}/>
                  </Route>

                  <Route path="/support" element={<Support/>}/>
                  <Route path="/create" element={<CreateListing/>}/>
                  

                  <Route path="/offers" element=   
                    {<PrivateRoute/>}>
                    <Route path='/offers' element={<Offers/>}/>
                  </Route>


                  <Route path="/category/:categoryName" element={<Category/>}/>
                  <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>

                  <Route path="/forgot" element={<ForgotPass/>}/>

                  <Route path='/contact/:landlordId' element={<Contact />} />
                  
                </Routes>
                {/* Navbar */}
                <Navbar/>
        </BrowserRouter>
        <ToastContainer/>
   </>
  )
}

export default App;
