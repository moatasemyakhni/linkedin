
const FormSelect = ({setInput, text, value, objectOfValues}) => {
    return (
      <div className='flex flex-col border pl-1'>
        <label className='tex text-xs' htmlFor={text.toLowerCase()}>{text}</label>
          <input 
              type={'select'}
              placeholder={text}
              value={value}
              id={text.toLowerCase()}
              onChange={(e) => setInput(e.target.value)}
              className=" outline-none h-7"
              />
            <select
                value={value}
                id={text.toLowerCase()}
                onChange={(e) => setInput(e.target.value)}
                className="outline-none h-7"
            >
                {
                    objectOfValues.forEach(element => {
                        return <option value={objectOfValues[element]} >{element}</option> 
                    })
                }
            </select>
      </div>
    )
  }
  
  export default FormSelect