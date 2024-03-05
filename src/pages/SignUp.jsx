import { useState } from "react";
import {toast} from "react-toastify"
import { Link, useNavigate} from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import {db} from "../firebase.config"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  //formData stores the value for both email and password
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      profession: '',
      phone: '',
      name:'',
  })
  //destructuring emanil and password from the form data
  const { email, password, profession, phone, name} = formData
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

  const professionOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profession: e.target.value
    }))
  }

  const phoneOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: e.target.value
    }))
  }

  const nameOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      name: e.target.value
    }))
  }

  const submitForm = async (e) => {
        e.preventDefault();

        try{
            const auth = getAuth();

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const user = userCredential.user;


            //update username
            updateProfile(auth.currentUser, {
              displayName: name
            })

            //create a copy of form data
            const formDataCopy = {...formData};
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, 'users', user.uid), formDataCopy)
            toast.success('Successful')

            navigate('/signin')
        } catch (error) {
            toast.error('Something went wrong, try again soon!!!')
        } 
  } 


  return (
    <>
      <div className="pageContainer pt-5 px-6 md:px-12 lg:px-40 justify-center text-center ">
        <header>
            <p className="pageHeader">
              Welcome!!!
            </p>
        </header>

        <main>
            <form onSubmit={submitForm}>
              <input type="text" className="nameInput" placeholder="Name" id="name" value={name} onChange={nameOnChange} required/>
            
              <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={emailOnChange} required />

              <div className="passwordInputDiv">
                  <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={passwordOnChange} />

                  <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
              </div>

              <input type="text" className="professionInput" placeholder="Profession" id="profession" value={profession} onChange={professionOnChange} required/>

              <input type="tel" className="nameInput" placeholder="Phone (Optional)" id="phone" value={phone} onChange={phoneOnChange}/>

             
              <Link to="/signin" className="forgotPasswordLink">
                  Have an account? Sign In
              </Link>
              

              <div className="signUpBar">
                  <p className="signUpText">Sign Up</p>
                  <button className="signUpButton">
                      <ArrowRightIcon 
                        fill="#ffffff" 
                        width="28px" 
                        height="28px"/>
                  </button>
              </div>

              
            </form>

            {/* Google Auth */}

        </main>
      </div>
    </>
  )
}

export default SignUp