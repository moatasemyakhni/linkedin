import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../form/Button';
import FormInput from '../form/FormInput';
import {userSignup} from '../../api/usersApi';

const UserSignup = () => {
    
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showEmailLabel, setShowEmailLabel] = useState(false);
    const [showPasswordLabel, setShowPasswordLabel] = useState(false);
    const [showFirstNameLabel, setShowFirstNameLabel] = useState(false);
    const [showLastNameLabel, setShowLastNameLabel] = useState(false);
    const [showCountryLabel, setShowCountryLabel] = useState(false);
    const [showCityLabel, setShowCityLabel] = useState(false);
    const [showPhoneLabel, setShowPhoneLabel] = useState(false);
    const focusOnInput = (setShowLabel) => {
        setIsError(false);
        setShowLabel(true);
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

      const nextStep = () => {
        setStep(step + 1);
      }

      const prevStep = () => {
        setStep(step - 1);
      }

    const hideEmailLabel = (value) => {
        if(!value) {
            setShowEmailLabel(false);
            return;
        }
        setShowEmailLabel(true);
    }
    const hidePasswordLabel = (value) => {
        if(!value) {
            setShowPasswordLabel(false);
            return;
        }
        setShowPasswordLabel(true);
    }
    const hideFirstNameLabel = (value) => {
        if(!value) {
            setShowFirstNameLabel(false);
            return;
        }
        setShowFirstNameLabel(true);
    }
    const hideLastNameLabel = (value) => {
        if(!value) {
            setShowLastNameLabel(false);
            return;
        }
        setShowLastNameLabel(true);
    }
    const hideCountryLabel = (value) => {
        if(!value) {
            setShowCountryLabel(false);
            return;
        }
        setShowCountryLabel(true);
    }
    const hideCityLabel = (value) => {
        if(!value) {
            setShowCityLabel(false);
            return;
        }
        setShowCityLabel(true);
    }
    const hidePhoneLabel = (value) => {
        if(!value) {
            setShowPhoneLabel(false);
            return;
        }
        setShowPhoneLabel(true);
    }

  const stepDisplay = () => {
    if (step === 0) {
      return (
        <div className='flex flex-col gap-3 mt-20 md:w-10/12 md:mx-auto'>
            <FormInput 
                showLabel={showEmailLabel}
                setShowLabel={setShowEmailLabel}
                hideLabel={hideEmailLabel}
                setInput={setEmail}
                text={'Email'}
                focusOnInput={focusOnInput}
                type={'email'}
                value={email}
            />

            <FormInput 
                showLabel={showPasswordLabel}
                setShowLabel={setShowPasswordLabel}
                hideLabel={hidePasswordLabel}
                setInput={setPassword}
                text={'Password'}
                focusOnInput={focusOnInput}
                type={'password'}
                value={password}
            />
            <Button text={'Next'} onClick={nextStep} />
        </div>

      )
    } else if (step === 1) {
      return( 
      <div className='flex flex-col gap-3 mt-20 md:w-10/12 md:mx-auto'>
        <FormInput 
            showLabel={showFirstNameLabel}
            setShowLabel={setShowFirstNameLabel}
            hideLabel={hideFirstNameLabel}
            setInput={setFirstName}
            text={'First Name'}
            focusOnInput={focusOnInput}
            type={'text'}
            value={firstName}
        />

        <FormInput 
            showLabel={showLastNameLabel}
            setShowLabel={setShowLastNameLabel}
            hideLabel={hideLastNameLabel}
            setInput={setLastName}
            text={'Last Name'}
            focusOnInput={focusOnInput}
            type={'text'}
            value={lastName}
        />
        <Button text={'Previous'} onClick={prevStep} />
        <Button text={'Next'} onClick={nextStep} />
    </div>)
    } else if (step === 2) {
        return( 
            <div className='flex flex-col gap-3 mt-20 md:w-10/12 md:mx-auto'>
              <FormInput 
                  showLabel={showCountryLabel}
                  setShowLabel={setShowCountryLabel}
                  hideLabel={hideCountryLabel}
                  setInput={setCountry}
                  text={'Country'}
                  focusOnInput={focusOnInput}
                  type={'text'}
                  value={country}
              />
      
              <FormInput 
                  showLabel={showCityLabel}
                  setShowLabel={setShowCityLabel}
                  hideLabel={hideCityLabel}
                  setInput={setCity}
                  text={'City'}
                  focusOnInput={focusOnInput}
                  type={'text'}
                  value={city}
              />
              <FormInput 
                  showLabel={showPhoneLabel}
                  setShowLabel={setShowPhoneLabel}
                  hideLabel={hidePhoneLabel}
                  setInput={setPhone}
                  text={'Phone'}
                  focusOnInput={focusOnInput}
                  type={'text'}
                  value={phone}
              />
              <Button text={'Previous'} onClick={prevStep} />
              <Button text={'Confirm'} onClick={(e) => signup(e)} />
          </div>)
    } else {

         navigate('/');
    }
  }

  const signup = async (e) => {
    e.target.disabled = true;
    const data = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        country: country,
        city: city,
        phone: phone
    }
    try {
        console.log(data);
        const signup = await userSignup(data);
        const token = signup.token;
        localStorage.setItem('user_token', token);
        e.target.disabled = false;
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setCountry('');
        setCity('');
        setPhone('');
        setStep(0);
        navigate('/users');
    }catch(err) {
        e.target.disabled = false;
        setIsError(true);
        setErrorMessage(err.response.data.message);
    }
  }
  return (
    <div>
        <h3 className='text-3xl text-center font-bold text-blue-700 p-10'>User Signup</h3>
        {isError? (
            <p className='h-10 text-red-500 mt-6'>{errorMessage}</p>
        ): (
            <p className='h-10 text-red-500 mt-6'>&nbsp;</p>
        )}
        {stepDisplay()}
    </div>
  )
}

export default UserSignup