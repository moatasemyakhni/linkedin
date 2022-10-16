
const FormInput = (props) => {
  return (
    <div className='flex flex-col border pl-1'>
        {props.showEmailLabel? (
            <label className='tex text-xs' htmlFor='email'>Email</label>
        ): (
            <label htmlFor='email' className='text-xs'>&nbsp;</label>
        )
        }
        <input 
            type='email'
            placeholder='Email'
            id='email'
            onFocus={() => props.setShowEmailLabel(true)}
            onBlur={(e) => props.hideEmailLabel(e.target.value)}
            onChange={(e) => props.setEmail(e.target.value)}
            className=" outline-none h-7"
            />
    </div>
  )
}

export default FormInput