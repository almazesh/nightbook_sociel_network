import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Main from '../Main/Main';
import { fire, google , db , firebase} from '../../Service/firebase'
import { useEffect, useState } from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar";
import Add from '../Add/Add';
import './Routes.scss'
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';

const Routes = ({user}) =>{
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [emailError , setEmailError] = useState('')
    const [passwordError , setPasswordError] = useState('')
    const [hasAccount , setHasAccount] = useState(false)

    const clearError = () =>{
        setEmailError('')
        setPasswordError('')
    }
    
    // Auth with Google 

    const signWithGoogle = (e) =>{
        e.preventDefault();
        clearError()
        fire.auth().signInWithPopup(google)
    }

    // Sign in with email and Password

    const handleLogIn = () =>{
        clearError()
        fire.auth().signInWithEmailAndPassword(email , password)
        .catch(err =>{
            switch(err.code){
                case 'auth/invalid-email': 
                case 'auth/user-disabled':
                case 'auth/user-not-found':
                    setEmailError(err.message);
                    break
                case 'auth/wrong-password':
                    setPasswordError(err.message) 
                    break;
                default:
            }
        })
    }

    // Sign up 

    const handleSignUp = () =>{
        clearError()
        fire.auth().createUserWithEmailAndPassword(email , password)
        .catch(err =>{
            switch(err.code){
                case 'auth/email-already-in-use': 
                case 'auth/invalid-email':
                    setEmailError(err.message);
                    break
                case 'auth/weak-password':
                    setPasswordError(err.message) 
                    break;
                default:
            }
        })
    }


     useEffect(() =>{
       if(user){
        db.collection('users').doc(user.uid).set({
            email:user.email,
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
            photoURL:user.photoURL
        },
        {
            merge:true
        }
                
        )
       }
    }, [user])
 
    return(
        <>
            {
                user ? (
                    <div className='routesRow'>
                        <Sidebar />
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route path='/newphoto' component={Add}/>
                            <Route path='/profile' component={Profile}/>
                            <Route path='/chat' component={Chat} />
                            <Redirect to='/' />
                        </Switch>
                    </div>
                ) : (
                    <Switch>
                        <Route exact path='/login'>
                            <Login email={email} password={password} emailError={emailError} passwordError={passwordError} hasAccount={hasAccount} setEmail={setEmail} setPassword={setPassword} setEmailError={setEmailError} setPasswordError={setPasswordError} setHasAccount={setHasAccount} handleLogIn={handleLogIn} handleSignUp={handleSignUp} signWithGoogle={signWithGoogle}/>
                        </Route>
                        <Redirect to='/login' />
                    </Switch>
                )
            }
        </>
    )
}
export default Routes;