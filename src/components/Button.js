import React from 'react'

export const Button = ({ onClick = () => { }, children, type, ...rest }) => {
    return (
        <button onClick={onClick} className={`w-full p-2 text-lg h-auto rounded-lg ${type ? "bg-red-300" : "bg-blue-300"}`}>
            {children}
        </button>
    )
}
