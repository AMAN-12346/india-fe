import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Router from 'next/router'
import logo from '../../assets/logo.svg';
import Dog from '../../assets/dog.jpg';


const Index = () => {
  const [otp, setOtp] = useState('')
  const [timeLeft, setTimeLeft] = useState(120)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearInterval(intervalId)
    } else {
      setErrorMessage('OTP has expired, please request a new one.')
    }
  }, [timeLeft])

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  const handleOtpChange = (e) => {
    const newOtp = e.target.value
    if (newOtp.length <= 4) {
      setOtp(newOtp)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!otp || otp.length !== 4) {
      setErrorMessage('Please fill the 4-digit OTP correctly.')
      return
    }
    if (timeLeft <= 0) {
      setErrorMessage('OTP has expired, please request a new one.')
      return
    }
    Router.push('/mart3')
  }

  return (
      <>
          <div className="w-full md:w-1/2 p-4 md:px-12">
            <div className="flex justify-center mb-4 md:mb-10">
              <Image src={logo} alt="Logo" width={100} height={100} />
            </div>
            <h1 className="text-center md:text-left text-sm text-gray-400 font-semibold mb-4">
              You will receive an OTP (One Time Password) on your mobile number
            </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Your OTP"
                value={otp}
                onChange={handleOtpChange}
                className="border border-gray-300 rounded-full py-2 px-4 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="text-sm text-gray-600 mb-4">
                The OTP will expire in {formatTime()} seconds
              </div>
              {errorMessage && (
                <div className="text-red-500 mb-2">{errorMessage}</div>
              )}
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 mt-32 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300"
                disabled={!otp || otp.length !== 4 || timeLeft <= 0}
              >
                Submit
              </button>
            </form>
          </div>
        </>
  )
}

export default Index
