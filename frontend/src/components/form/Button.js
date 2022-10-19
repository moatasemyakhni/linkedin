
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick} className={`rounded-full bg-blue-700 text-white p-4 text-xl hover:bg-blue-900`}>{text}</button>
  )
}

export default Button