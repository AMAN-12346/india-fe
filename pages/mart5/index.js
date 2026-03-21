import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import home from '../../assets/Delhi.jpg';
import logo from '../../assets/logo.svg';
import Dog from '../../assets/dog.jpg';
import Router from 'next/router'; 

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(120);
  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  const handleBack = () => {
    Router.push('/');

  }
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
            <div className='flex justify-center mb-4 md:mb-5'>
              <Image src={logo} alt='Logo' width={100} height={100} />
            </div>
            <div className=' text-center'>
              <svg
                viewBox='0 0 24 24'
                className='w-16 h-16 text-green-500 mx-auto mb-4'
              >
                <path
                  fill='currentColor'
                  d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
                />
              </svg>
              <h1 className='text-[30px] font-semibold text-gray-400 mb-4'>
                Thank You!
              </h1>
              <p className='mb-4 text-gray-400'>
                For your valuable feedback and any other query you can contact
                us on
              </p>
              <div className='text-gray-400 mb-4'>
                <div>Phone: 9696969696</div>
                <div>Email: helpdesk@indiamart.com</div>
                <div>Write Us: customercare@indiamart.com</div>
              </div>
              <button onClick={handleBack} className='text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-md'>
                Back Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
