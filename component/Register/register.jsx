import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../../assets/logo.svg';

const index = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://indiamartbackend.onrender.com/user/getData');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users');
        console.error(error);
      }
    };
   
    fetchUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
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
        {error && <div className='text-red-500 text-sm mb-2'>{error}</div>}
        <button
          type='submit'
          className='bg-red-600 mt-36 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300'
          disabled={loading}
        >
          Next
        </button>
      </form>
    </>
  );
};

export default index;
