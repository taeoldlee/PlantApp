export function Button({ children, className, ...props }) {
    return (
      <button 
        className={`px-4 py-2 rounded mt-4 bg-green-600 hover:bg-green-400 transition-all duration-300 ease-in-out hover:scale-[1.10] text-white ${className}`} 
        {...props}
      >
        {children}
      </button>
    )
  }