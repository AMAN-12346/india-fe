import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router'; // Import Router for redirection
import { useUser } from '@/auth/context';
import home from '../../assets/Delhi.jpg';
import logo from '../../assets/logo.svg';
import axios from 'axios';
import Dog from '../../assets/dog.jpg';

// StarRating component definition
const StarRating = ({ count, label, onChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { userData, setUserData } = useUser();
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index) => {
    setRating(index);
    onChange(index); // Pass the rating value up to the parent component via callback
  };

  const handleRatingChange = (ratingType) => (ratingValue) => {
    setUserData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [ratingType]: ratingValue },
    }));
  };

  return (
    <div>
      <div className='text-gray-400  text-sm mb-1 font-medium px-1'>
        -{label}
      </div>
      <div className='flex'>
        {[...Array(count)].map((_, i) => (
          <svg
            key={i}
            onMouseEnter={() => onMouseEnter(i + 1)}
            onMouseLeave={onMouseLeave}
            onClick={() => onSaveRating(i + 1)}
            className={`h-6 w-6 cursor-pointer ${
              rating >= i + 1 || hoverRating >= i + 1
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M9.049 2.927c.384-.737 1.435-.737 1.819 0l1.705 3.276 3.611.525c.802.117 1.122 1.097.542 1.656l-2.614 2.547.617 3.595c.134.778-.683 1.37-1.361.999L10 13.347 5.351 15.625c-.678.371-1.495-.221-1.361-.999l.617-3.595-2.614-2.547c-.58-.559-.26-1.539.542-1.656l3.611-.525 1.705-3.276z' />
          </svg>
        ))}
      </div>
    </div>
  );
};

const Index = ({ onRatingSubmit }) => {
  const { userData } = useUser();
  const [customerLeadsRating, setCustomerLeadsRating] = useState(0);
  const [salesConversionRating, setSalesConversionRating] = useState(0);
  const [accountManagerRating, setAccountManagerRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      customerLeadsRating === 0 ||
      salesConversionRating === 0 ||
      accountManagerRating === 0
    ) {
      setErrorMessage('Please fill in all the ratings.');
      return;
    } else {
      onRatingSubmit(); // Call the passed callback function to change vie
    }
  };

  return (
    <>
      <div className='flex justify-center mb-4 md:mb-5'>
        <Image src={logo} alt='Logo' width={100} height={100} />
      </div>
      <h1 className='text-center md:text-left text-sm text-gray-400 font-semibold mb-4'>
        Thanks for connecting with Indiamart. Please share your business
        experience by giving us a rating here
      </h1>
      <div className='text-gray-400'>
        <StarRating
          count={5}
          onChange={(value) => setCustomerLeadsRating(value)}
          label='How the leads are coming from customers'
        />
        <StarRating
          count={5}
          onChange={(value) => setSalesConversionRating(value)}
          label='How are the leads conversion in sells'
        />
        <StarRating
          count={5}
          onChange={(value) => setAccountManagerRating(value)}
          label='Experience with your account manager appointed by us'
        />
      </div>
      {errorMessage && (
        <div className='text-red-500 text-sm mb-2'>{errorMessage}</div>
      )}
      <button
        onClick={handleSubmit}
        className='mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300'
      >
        Submit
      </button>
    </>
  );
};

export default Index;
