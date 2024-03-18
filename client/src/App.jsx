import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from './Components/signup'
import Login from './Components/login'
import Home from './Components/home'
import Forgotpassword from './Components/forgotpassword'
import OTP from "./Components/otp";

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path = "/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgotpassword" element={<Forgotpassword/>}></Route>
        <Route path="/otp" element={<OTP/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
