import { Link, NavLink } from 'react-router-dom'
import './Sidebar.scss'
import {AiFillHome , AiFillMessage} from 'react-icons/ai'
import {RiSearch2Fill} from 'react-icons/ri'
import {ImCamera} from 'react-icons/im'
import { useAuthState } from 'react-firebase-hooks/auth';
import { fire } from '../../Service/firebase'
import {FaUserCircle} from 'react-icons/fa'

const Sidebar = () =>{
    const [user] = useAuthState(fire.auth())


    return(
        <>
            <div className='sidebar'>
                <Link to='/profile'>
                    {
                        user.photoURL ? (
                            <img alt='' className='userImg' src={user.photoURL}/>
                        ) : (
                            <FaUserCircle className='userIcon'/>
                        )
                    }
                </Link>
                <ul>
                    <li>
                        <NavLink exact activeClassName='activeLink' to='/'>
                            <AiFillHome />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='activeLink'  to='/login'>
                            <RiSearch2Fill />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='activeLink'  to='/newphoto'>
                            <ImCamera />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='activeLink'  to='/chat'>
                            <AiFillMessage />
                        </NavLink>
                    </li>
                </ul>

                <div>

                </div>
            </div>
        </>
    )
}

export default Sidebar;