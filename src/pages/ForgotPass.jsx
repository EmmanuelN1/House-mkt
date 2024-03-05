import {useState} from "react"
import { Link } from "react-router-dom"
import {getAuth, sendPasswordResetEmail} from "firebase/auth"
import {toast} from "react-toastify"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPass() {

  const [ email, setEmail] = useState('')

  const onChange = e => {
      setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Password Reset Link Sent To Email")
    }
    catch (error) {
        toast.error('Couldnt Send Reset Email')
    }
  }

  return (
    <div className="pt-5 px-6 md:px-12 lg:px-40 justify-center pageConatiner">
        <header>
            <p className="pageHeader">
                Forgot Password
            </p>
        </header> 

        <main>
            <form onSubmit={onSubmit} >
                <input type="text" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>

                <Link className="forgotPasswordLink" to="/signin">Sign In</Link>

                <div className="signInBar">
                    <div className="signInText">
                      Send Reset Link
                    </div>

                    <button className="signInButton">
                        <ArrowRightIcon  
                              fill="#ffffff" 
                              width="34px" 
                              height="34px"/>
                    </button>
                </div>
            </form>
        </main>
    </div>
  )
}

export default ForgotPass