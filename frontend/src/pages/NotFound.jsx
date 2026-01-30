import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-slate-50'>
      <img 
        src="404_NotFound.png" 
        alt="404 Not Found" 
        className='max-w-full mb-6 w-96' />

      <p className='text-xl font-semibold'>
        Bạn đang đi vào vùng cấm địa 🚫
      </p>

      <a href="/" className='inline-block mt-6 px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary-dark transition-colors'>
        Quay lại trang chủ
      </a>
    </div>
  )
}

export default NotFound;