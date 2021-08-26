import './Login.scss'
import {MdEmail} from 'react-icons/md'
import {RiLockPasswordFill} from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
const Login = ({
    email , password , setEmail , setPassword , setEmailError , setPasswordError , emailError , passwordError , hasAccount , setHasAccount , handleLogIn , handleSignUp , signWithGoogle
}) =>{

 
    return(
        <>
            <div className='rootLogin'>
                <div className='row'>
                    <div>
                        <h1>nightbook</h1>
                    </div>
                    <div className='formLogin'>
                        <div className='formCard'>
                            <div className='absoluteCard'>
                                {
                                    hasAccount ? (
                                        <h2>Authorization</h2>
                                    ) : (
                                        <h2>Registration</h2>
                                    )
                                }
                                <div>
                                    <p>{emailError}</p>
                                    <input defaultValue={email} type='email' required placeholder='email *' onChange={e => setEmail(e.target.value)}/>
                                    <MdEmail className='emailIcon' />
                                    <p>{passwordError}</p>
                                    <input required defaultValue={password} type='password' placeholder='password *' onChange={(e) => setPassword(e.target.value)}/>
                                    <RiLockPasswordFill className='passwordIcon'/>
                                </div>
                                {
                                    hasAccount ? (
                                        <>
                                            <button onClick={handleLogIn}>Sign in</button>
                                            <span onClick={() => setHasAccount(prev => !prev)}>Dont` have an account? <i>Sign Up</i></span>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={handleSignUp}>Sign up</button>
                                            <FcGoogle onClick={signWithGoogle}  className='googleIcon'/>
                                            <span onClick={() => setHasAccount(prev => !prev)}>Have an account? <i>Sign in</i></span>

                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;