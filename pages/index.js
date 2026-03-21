import React, { useState } from 'react';
import Image from 'next/image';
import { useUser } from '@/auth/context';
import logo from '../assets/logo.svg';
import Dog from '../assets/dog.jpg';
import axios from 'axios';
import OtpVerify from '../component/OtpVerify/verify';
import Rating from '../component/Rating/rating';
import Submit from '../component/submit/submit';

const Index = () => {
  const { setUserData } = useUser();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('form'); // Manage different views: 'form', 'otpVerify', 'rating'

  const handleMobileChange = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
      setUserData((prev) => ({ ...prev, mobileNumber: e.target.value }));
    }
  };

  const saveMobileNumber = async (mobileNumber) => {
    setLoading(true);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';
      const response = await axios.post(`https://indiamartbackend.onrender.com/user/saveData`, {
        mobile: mobileNumber,
      });
      if (response.status !== 200) {
        throw new Error(
          response.data.message || 'Failed to save mobile number'
        );
      }
      return response.data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Please enter a valid 10 digit mobile number');
      return;
    }
    setError('');
    const result = await saveMobileNumber(mobile);
    if (result) {
        setUserData(prev => ({ ...prev, mobileNumber: mobile }));
      setCurrentView('otpVerify'); // Switch to OTP verification view
    }
  };

  const handleOtpVerification = () => {
    setCurrentView('rating'); // Switch to rating view after OTP verification
  };

  const handleRatingSubmit = () => {
    setCurrentView('home'); // Function to transition to Home view
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-950'>
      <div className='bg-white rounded-lg shadow-lg max-w-full w-full md:w-[900px] h-auto md:h-[500px]'>
        <div className='flex flex-col md:flex-row rounded-lg'>
          <Image
            src={Dog}
            alt='Cute dog'
            width={450}
            height={100}
            className='h-[500px]'
          />
          <div className='w-full md:w-1/2 p-4 md:px-12'>
            {currentView === 'form' && (
              <div>
                <div className='flex justify-center mb-4 md:mb-10'>
                  <Image src={logo} alt='Logo' width={100} height={100} />
                </div>
                <h1 className='text-center md:text-left text-sm text-gray-400 font-semibold mb-4'>
                  Please enter your 10 digit mobile number for feedback
                </h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type='text'
                    placeholder='Enter Your Mobile Number'
                    value={mobile}
                    onChange={handleMobileChange}
                    className='border border-gray-300 rounded-full py-2 px-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                  {error && (
                    <div className='text-red-500 text-sm mb-2'>{error}</div>
                  )}
                  <button
                    type='submit'
                    className='bg-red-600 mt-36 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300'
                    disabled={loading}
                  >
                    Next
                  </button>
                </form>
              </div>
            )}
            {currentView === 'otpVerify' && (
              <OtpVerify onOtpVerification={handleOtpVerification} />
            )}
            {currentView === 'rating' && (
              <Rating onRatingSubmit={handleRatingSubmit} />
            )}
            {currentView === 'home' && <Submit />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
