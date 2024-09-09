import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/Authcontext'
import {useSpring} from '@react-spring/web'
import {Hourglass } from 'react-loader-spinner'
import {Button, Container, Form, Input, InputWrapper, TogglePasswordButton} from '../Styled/styled'
import { GlobalStyles } from '../Componants/GlobalStyles'
import { FaEye, FaEyeSlash, FaHome } from 'react-icons/fa'
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ParticleBackground from '../Componants/ParticleBackground'
import Modal from 'react-modal';



const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
   
    const {login}=useContext(AuthContext)
    const navigate=useNavigate()
    const formProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });




    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
         
            setLoading(true)
            
            const res= await axios.post('https://codeconverter1.onrender.com/login',{email,password})
            toast(res.data.msg)
          login(res.data)
       
          setLoading(false)
                 navigate("/")
        } catch (error) {
          // toast('invalid credentials from login');
            console.error('Login failed:', error.message);
setLoading(false)
        }
    }

    const handleForgotPassword = async () => {
      try {
        const res = await axios.post('https://codeconverter1.onrender.com/forgot-password', { email: forgotEmail });
        if (res.data.msg === 'OTP sent successfully') setIsOtpSent(true);
        toast(res.data.msg);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    };
  
    const handleResetPassword = async () => {
      try {
        const res = await axios.post('https://codeconverter1.onrender.com/reset-password', { email: forgotEmail, otp, newPassword });
        toast(res.data.msg);
        setModalIsOpen(false);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    };

    

  return (
    <>
   <ParticleBackground/>
    <GlobalStyles/>
    
    <Container>
        <Form initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={formProps} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" placeholder="Your Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputWrapper>
            <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TogglePasswordButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</TogglePasswordButton>
          </InputWrapper>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Hourglass visible={loading} height="17" width="80" ariaLabel="hourglass-loading" wrapperStyle={{}} wrapperClass="" colors={['white', 'white']} />
            ) : (
              'Login'
            )}
          </Button>
         

          <h3>
            don't have an account?<Link to="/signup"><span className="acc">signup</span></Link>
          </h3>
          <div style={{display:'flex',justifyContent:"space-between"}}>
          <FaHome onClick={() => navigate('/')} style={{ cursor: 'pointer', fontSize: '1.5em', marginTop: '10px' }} />
          <p style={{cursor:"pointer"}} onClick={() => setModalIsOpen(true)}>forget password?</p>
          {/* <Button type="button" onClick={() => setModalIsOpen(true)}>Forgot Password</Button> */}
          </div>
        </Form>
      </Container>

      <Modal id='model-content'  isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contentLabel="Forgot Password" ariaHideApp={false}>
        <h2>Forgot Password</h2>
        {isOtpSent ? (
          <>
            <Input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Button onClick={handleResetPassword}>Reset Password</Button>
          </>
        ) : (
          <>
            <Input type="email" placeholder="Enter Your Email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            <Button onClick={handleForgotPassword}>Send OTP</Button>
          </>
        )}
        <Button id='closeBtn' onClick={() => setModalIsOpen(false)}>Close</Button>
      </Modal>
    
   
      
    </>
  )
}

export default Login