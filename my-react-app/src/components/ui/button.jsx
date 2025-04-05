export function Button({ children, className, ...props }) {
    return (
      <button 
        className={`px-4 py-2 rounded mt-4 bg-green-600 hover:bg-green-700 text-white ${className}`} 
        {...props}
      >
        {children}
      </button>
    )
  }