import { useContext, useState } from 'react';
import { createUser } from '../utils/http';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';


function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx =  useContext(AuthContext);

  async function signupHandler({email, password}) {
      setIsAuthenticating(true);
      try {
        const token = await createUser(email,password);
        authCtx.authenticate(token)
      } catch(error) {
        Alert.alert('Authenticate falled', 'Please check your input')
        setIsAuthenticating(false);
      }
      
      setIsAuthenticating(false);
  }

  if(isAuthenticating) {
    return <LoadingOverlay />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
