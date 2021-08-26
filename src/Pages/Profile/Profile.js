import Header from '../../Components/Header/Header'
import './Profile.scss'
import { useAuthState } from 'react-firebase-hooks/auth';
import { fire } from '../../Service/firebase';
import {FaUserCircle} from 'react-icons/fa'

const Profile = () =>{
    const [user] = useAuthState(fire.auth())

    return(
        <>
            <div className='profile'>

                {/* HEADER  */}

                <Header title='Profile' />

                {/* CONTENT */}

                <div className='profileContent'>
                    <div className='profileCard'>
                        <div className='profileCardInline'>
                            <div>
                                {
                                    user.photoURL ? (
                                        <img alt='' src={user.photoURL} onClick={() => fire.auth().signOut()}/>
                                    ) : (
                                        <FaUserCircle className='profileUserIcon' onClick={() => fire.auth().signOut()}/>
                                    )
                                }
                            </div>
                            <div>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;