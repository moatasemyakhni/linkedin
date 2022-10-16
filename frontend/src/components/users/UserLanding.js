import {useEffect} from 'react'

const UserLanding = ({set_at_form}) => {

    useEffect(() => {
        set_at_form(false);
      }, []);

  return (
    <div>UserLanding</div>
  )
}

export default UserLanding