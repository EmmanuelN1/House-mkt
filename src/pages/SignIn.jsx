import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  //formData stores the value for both email and password
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  })
  //destructuring emanil and password from the form data
  const { email, password} = formData
  const navigate = useNavigate()

  const emailOnChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        email: e.target.value
      }))
  } 

  const passwordOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      password: e.target.value
    }))
  }

  const submit = async(e) => {
      e.preventDefault(); 

      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          toast.success("You are logged in")
          navigate('/')
        }

      } catch(error) {
            toast.error('Bad User Credentials')
      }

      
  }

  return (
    <>
      <div className="pageContainer pt-5 px-6 md:px-12 lg:px-40 justify-center  ">
        <header>
            <p className="pageHeader">
              Welcome Back!!!
            </p>
        </header>

        <main>
            <form onSubmit={submit}>
              <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={emailOnChange} required/>

              <div className="passwordInputDiv">
                  <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={passwordOnChange} required />

                  <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
              </div>

              <div className="linkContainers space-x-4 lg:space-x-16"> 

                  <Link to="/forgot" className="forgotPasswordLink">
                      Forgot Password
                      
                      
                  </Link>

                  <Link to="/signup" className="registerLink">
                    Create An Account
                </Link>

              </div>
           

              <div className="signInBar">
                  <p className="signInText">Sign In</p>
                  <button className="signInButton">
                      <ArrowRightIcon 
                        fill="#ffffff" 
                        width="34px" 
                        height="34px"/>
                  </button>
              </div>
            </form>

            {/* Google Auth */}

         
        </main>
      </div>
    </>
  )
}

export default SignIn