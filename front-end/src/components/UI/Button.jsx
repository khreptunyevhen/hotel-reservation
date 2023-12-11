function Button({ children, type, onClick }) {
  return (
    <button onClick={onClick} className="bg-primary rounded-lg px-4 py-2 font-medium text-background hover:scale-110 transition duration-300" type={type}>{children}</button>
  )
}

export default Button