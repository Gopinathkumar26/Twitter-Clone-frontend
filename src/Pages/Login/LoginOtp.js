import { Box, Modal, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
//import auth from '../../firebase.init';
import './LoginOtp.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 8,

};

const LoginOtp = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpNumber, setOtpNumber] = useState('');

  const generateRecaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
         //handleSendOtp();
         console.log("captcha verified")
      }
    });
  }

  const handleSendOtp =  (e) => {
     e.preventDefault();
    setPhoneNumber("")
    generateRecaptcha();
    const number = "+91" + phoneNumber
    console.log(number)
    if(phoneNumber.match(/^[[6-9]{1}[0-9]{9}$/)) {
      
    
    let appVerifier = window.recaptchaVerifier;
    const auth = getAuth();
     signInWithPhoneNumber(auth, number, appVerifier)
     
      .then((confirmationResult) => {
        window.confirmationResult =  confirmationResult;
        alert("OTP has sent to your phonenumber")  
      }).catch((error) => {
        console.log(error);
      });
    } else alert("Enter valid phonenumber!!")
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpNumber("")
    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otpNumber).then((result) => {
      let user = result.user;
      console.log(user);
      navigate("/")
      alert('User signed in successfully');
    }).catch((error) => {
      alert('Invalid OTP');
      console.log(error)
    });
  }

  return (
    <div>
      <button className='ph-btn' onClick={() => setOpen(true)}>Login with Phone number</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="modal">
          <IconButton onClick={() => { setOpen(false); }} style={{ float: "right" }} ><CloseIcon /></IconButton>
          <h2 style={{
            textAlign: "center",
            marginTop: "35px",
            paddingLeft: "15px"
          }}>Login with Phonenumber</h2>
          
            <div>
              <form className='container' onSubmit={handleSendOtp}>
                <div id="recaptcha"></div>
                <input className='phone-input'
                  type='tel'
                  maxLength='10'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder='Enter Phone Number' />
                <button className='otp-button' type='submit'>Send OTP</button>
              </form>
            </div>
             
            <div>
              <form className='container' onSubmit={handleVerifyOtp}>
                <input className='phone-input'
                  type='tel'
                  maxLength='6'
                  value={otpNumber}
                  onChange={(e) => setOtpNumber(e.target.value)}
                  placeholder='Enter OTP' />
                <button className='submit-button' type='submit'>Verify OTP</button>
              </form>
            </div>
        </Box>
      </Modal>
    </div>
  )
}

export default LoginOtp;