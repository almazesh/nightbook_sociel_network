import  './ChatList.scss'
import getExsistEmail from '../../API/getExsistEmail';
import { db, fire } from '../../Service/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
const ChatList = ({id , users}) =>{
    const [user] = useAuthState(fire.auth())
    const [photoExsist] = useCollection(db.collection('users').where('email' , '==' , getExsistEmail(users , user)))
    const photo = photoExsist?.docs?.[0]?.data()

    const emails = getExsistEmail(users , user)


    return(
        <>
            <ul className='chatList'>
                <NavLink activeClassName='activeNav' to={`/chat/message/${id}`} >
                    {
                      photo ? (
                          <img alt='' src={photo?.photoURL}/>
                      )  : (
                          <p>{emails[0]}</p>
                      )
                    }
                    {emails}
                </NavLink>
            </ul>
        </>
    )
}

export default ChatList;