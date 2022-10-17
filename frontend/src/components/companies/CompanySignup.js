import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../form/Button";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import {companySignup} from '../../api/companyApi';

const CompanySignup = () => {


    const typesOfCompany = {
        'public company': 'public company',
        'self-employed': 'self-employed',
        'government agency': 'government agency',
        'non profit': 'non profit',
        'privately held': 'privately held',
        'partnership': 'partnership',
        'sole proprietorship': 'sole proprietorship'
    };
    const companySize = {
        "0-1": 1,
        "2-10": 10,
        "11-50": 50,
        "51-200": 200,
        "201-500": 500,
        "501-1000": 1000,
        "1001-5000": 5000,
        "5001-10,000": 10000,
        "10,001+": 10001,
    }
    const navigate = useNavigate();

    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showEmailLabel, setShowEmailLabel] = useState(false);
    const [showPasswordLabel, setShowPasswordLabel] = useState(false);
    const [showNameLabel, setShowNameLabel] = useState(false);
    const [showIndustryLabel, setShowIndustryLabel] = useState(false);
    const focusOnInput = (setShowLabel) => {
        setIsError(false);
        setShowLabel(true);
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");
    const [organizationSize, setOrganizationSize] = useState(companySize["0-1"]);
    const [type, setType] = useState(typesOfCompany["public company"]);

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
    const hideNameLabel = (value) => {
        if(!value) {
            setShowNameLabel(false);
            return;
        }
        setShowNameLabel(true);
    }
    const hideIndustryLabel = (value) => {
        if(!value) {
            setShowIndustryLabel(false);
            return;
        }
        setShowIndustryLabel(true);
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
                showLabel={showNameLabel}
                setShowLabel={setShowNameLabel}
                hideLabel={hideNameLabel}
                setInput={setName}
                text={'Name'}
                focusOnInput={focusOnInput}
                type={'text'}
                value={name}
            />
    
            <FormInput 
                showLabel={showIndustryLabel}
                setShowLabel={setShowIndustryLabel}
                hideLabel={hideIndustryLabel}
                setInput={setIndustry}
                text={'Industry'}
                focusOnInput={focusOnInput}
                type={'text'}
                value={industry}
            />
            <Button text={'Previous'} onClick={prevStep} />
            <Button text={'Next'} onClick={nextStep} />
        </div>)
        } else if (step === 2) {
            return( 
                <div className='flex flex-col gap-3 mt-20 md:w-10/12 md:mx-auto'>
                  <FormSelect
                      setInput={setType}
                      text={'Type'}
                      objectOfValues={typesOfCompany}
                      value={type}
                  />
          
                  <FormSelect 
                      setInput={setOrganizationSize}
                      text={'Organization size'}
                      objectOfValues={companySize}
                      value={organizationSize}
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
            name: name,
            email: email,
            password: password,
            industry: industry,
            organizationSize: organizationSize,
            type: type,
        }
        try {
            const signup = await companySignup(data);
            const token = signup.token;
            localStorage.setItem('company_token', token);
            e.target.disabled = false;
            setEmail('');
            setPassword('');
            setName('');
            setIndustry('');
            setOrganizationSize(companySize["0-1"]);
            setType(typesOfCompany["public company"]);
            navigate('/companies');
        }catch(err) {
            e.target.disabled = false;
            setIsError(true);
            setErrorMessage(err.response.data.message);
        }
      }

  return (
    <div>
        {isError? (
            <p className='h-10 text-red-500 mt-6'>{errorMessage}</p>
        ): (
            <p className='h-10 text-red-500 mt-6'>&nbsp;</p>
        )}

        {
            stepDisplay()
        }
    </div>
  )
}

export default CompanySignup