import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUser } from '@/auth/context';
import Router from 'next/router';
import logo from '../../assets/logo.svg';
import Dog from '../../assets/dog.jpg';
import axios from 'axios';

const Index = ({ onOtpVerification }) => {
  const { userData } = useUser();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setErrorMessage('OTP has expired, please request a new one.');
    }
  }, [timeLeft]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value.slice(0, 4)); // Ensure OTP input is limited to 4 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      setErrorMessage('Please fill the 4-digit OTP correctly.');
      return;
    }
    if (timeLeft > 0) {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';
        const response = await axios.post(`${API_URL}/user/VerifyOtp`, {
          mobile: userData?.mobileNumber, // Use mobile number from context
          otp: otp,
        });
        if (response.status === 200) {
          onOtpVerification(); // Proceed further as necessary
        } else {
          setErrorMessage(response?.data?.message);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  return (
    <>
      <div className='flex justify-center mb-4 md:mb-10'>
        <Image src={logo} alt='Logo' width={100} height={100} />
      </div>
      <h1 className='text-center md:text-left text-sm text-gray-400 font-semibold mb-4'>
        You will receive an OTP (One Time Password) on your mobile number
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter Your OTP'
          value={otp}
          onChange={handleOtpChange}
          className='border border-gray-300 rounded-full py-2 px-4 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
        <div className='text-sm text-gray-600 mb-4'>
          The OTP will expire in{' '}
          {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${
            timeLeft % 60
          }`}{' '}
          seconds
        </div>
        {errorMessage && (
          <div className='text-red-500 mb-2'>{errorMessage}</div>
        )}
        <button
          type='submit'
          className='bg-red-600 hover:bg-red-700 mt-32 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300'
          disabled={!otp || otp.length !== 4 || timeLeft <= 0}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Index;
