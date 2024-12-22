import React from 'react'

const IconBtn = ({
    text,
    children,
    onclick,
    disabled,
    outline=false,
   
    type
}) => {
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center bg-black text-white cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 `}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
  )
}

export default IconBtn
