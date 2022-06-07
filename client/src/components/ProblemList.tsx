import React from 'react'

export default function ProblemList() {
  return (
    <div className='space-y-4'>
        {[0,1,2,3].map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-[whitesmoke] p-4 px-8 rounded shadow hover:scale-105 transition-all duration-300 ease-in-out">
                <div>
                    <h2 className='text-xl m-0 hover:underline cursor-pointer'>Array Manipulation</h2>
                    <p className='m-0 max-w-2xl mt-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora vero sit in non blanditiis dignissimos ducimus quia pariatur asperiores quasi.</p>
                </div>
                <button className='p-2 px-4 bg-slate-600 outline-none rounded shadow text-white'>Solve Now</button>
            </div>
        ))}
    </div>
  )
}
