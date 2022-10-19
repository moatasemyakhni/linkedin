
const FormSelect = ({setInput, text, value, objectOfValues}) => {
    return (
      <div className='flex flex-col border pl-1'>
        <label className='tex text-xs' htmlFor={text.toLowerCase()}>{text}</label>
            <select
                value={value}
                name={text.toLowerCase()}
                id={text.toLowerCase()}
                onChange={(e) => setInput(e.target.value)}
                className="outline-none h-7"
            >
                {
                    Object.keys(objectOfValues).map(e => {
                        return <option value={objectOfValues[e]} >{e}</option> 
                    })
                }
            </select>
      </div>
    )
  }
  
  export default FormSelect