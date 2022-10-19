
const FormInput = ({showLabel, setShowLabel, hideLabel, setInput, text, focusOnInput, type, value}) => {
  return (
    <div className='flex flex-col border pl-1'>
        {showLabel? (
            <label className='tex text-xs' htmlFor={text.toLowerCase()}>{text}</label>
        ): (
            <label htmlFor={text.toLowerCase()} className='text-xs'>&nbsp;</label>
        )
        }
        <input 
            type={type}
            placeholder={text}
            value={value}
            id={text.toLowerCase()}
            onFocus={() => focusOnInput(setShowLabel)}
            onBlur={(e) => hideLabel(e.target.value)}
            onChange={(e) => setInput(e.target.value)}
            className=" outline-none h-7"
            />
    </div>
  )
}

export default FormInput