import React from 'react'

function PageTitle({title}) {
  return (
    <div className='mt-2 mb-6'>
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{title}</h1>
      </div>
      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2"></div>
    </div>
  )
}

export default PageTitle