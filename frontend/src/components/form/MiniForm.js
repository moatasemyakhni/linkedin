import FormInput from "./FormInput"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const MiniForm = ({formData, setFormData, currentPage, setCurrentPage}) => {
    const [showEmailLabel, setShowEmailLabel] = useState(false);
    const [showPasswordLabel, setShowPasswordLabel] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

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
  return (
    <div>
    {/* //     <FormInput  */
    //         showLabel={showLabel}
    //         setShowLabel={setShowLabel}
    //         hideLabel={hideLabel}
    //         setInput={setInput}
    //         text={}
    //         focusOnInput={}
    //         type
    //        value={}
    //     />
    //     <FormInput 
    //     />
  }
    </div>
  )
}

export default MiniForm