const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
