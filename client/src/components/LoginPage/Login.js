import { useState,React } from 'react'
import axios from 'axios';
import eyeSlash from "../../assets/images/eyeSlash.png"
import seePassword from "../../assets/images/seePassword.png"
import "../LoginPage/Login.css"
import { useNavigate } from 'react-router-dom';
// import HomePage from "../HomePage/HomePage"

const Login = () =>  {
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState("password");
    const [iconToggle, setIconToggle] = useState(false)
    const [email, setEmail] = useState("")
     const [errorMessage, setErrorMessage]=useState("")
    const [password, setPassword] = useState("")
    // const toggleIcon = () => {
    //     setIconToggle(!iconToggle)
    // }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const handleSubmit =async(e) => {

        e.preventDefault();
     
       try{
        const response=await axios.post( 'http://localhost:5000/api/users/login',{
            email,
            password,
        }
    )
    const { token, tokenType, userId } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('userId', userId);

   
    console.log('Login successful!', token);
    navigate("/")
       }
       catch (error) {
        setErrorMessage("Login failed. Please check your email or password.");
        console.error("There was an error logging in:", error);
    }
       
    };
    return (
        <div>
            <div className='logo'>
                {/* <img src={tree} alt="logo" /> */}
                {/* <img src={agri_name} alt="Agri supply" /> */}
            </div>
            <div className='login-body'>
                <div className="formheader">
                    <h3>Welcome back!</h3>
                    <p>Login to continue..</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="email">
                        <label htmlFor='email'>Email Address</label>
                        <input type="email" placeholder="myemail@gmail.com" className='input' required id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="pwrd flex">
                        <label htmlFor='password'>Password</label>
                        <input type={passwordType}  onChange={(e) => setPassword(e.target.value)} placeholder="**********" required className='input' id="password" name="password" />
                        <div onClick={togglePassword}>
                            {passwordType === "password" ? <img src={eyeSlash} alt="eye slash" /> : <img src={seePassword} alt="see password"/>}
                        </div>
                    </div>
                    <div className="rem">
                        <div className="rm-me">
                            <div className="" >
                                <input type="checkbox" />
                            </div>
                            <p className='loggedIn'>Keep me logged in</p>
                        </div>
                        <p className="forgot">Forgot password?</p>
                    </div>
                    <div className='createAcct-div'>
                        <p>Don’t have an account yet?<span className='createAcct'>Create Account</span> </p>
                    </div>
                    <button type='submit' className="login-btn">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login