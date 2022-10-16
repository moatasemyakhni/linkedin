import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../form/Button';
import FormInput from '../form/FormInput';


const UserSignup = () => {
    
    const navigate = useNavigate();

    const [step, setstep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [disable, setDisable] = useState(false);
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
        setstep(step + 1);
      }

      const prevStep = () => {
        setstep(step - 1);
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
              <Button text={'Confirm'} onClick={userSignup} />
          </div>)
    } else {

         navigate('/');
    }
  }

  const userSignup = () => {
    console.log("Hoooray");
  }
  return (
    <div>
        {stepDisplay()}
    </div>
  )
}

export default UserSignup