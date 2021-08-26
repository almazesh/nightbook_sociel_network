import './MessageScreen.scss'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, fire } from '../../Service/firebase';
import MessageItem from '../MessageItem/MessageItem';
import {useCollection} from 'react-firebase-hooks/firestore'
import MessageInput from '../MessageInput/MessageInput';
import getExsistEmail from '../../API/getExsistEmail';
const MessageScreen = ({messages , userInfo , messageShot}) =>{
    const users = userInfo.users
    const [user] = useAuthState(fire.auth())
    // const [esxistPhoto] = useCollection(
    //     db.collection('users').where('email' , '==' , getExsistEmail(users , user))
    // )
    const chatUser = getExsistEmail(users , user)
    
    const showMessage = () =>{
        if(messageShot){
            return messageShot.docs.map(item =>(
                <MessageItem key={item.id} user={item.data().user} messages={{
                    ...item.data(),
                    timestamp:item.data().timestamp?.toDate().getTime()
                }}/>
            ))
        } else{
            return Object.entries(messages).map(mess =>{
                <MessageItem key={mess.id} messages={mess} user={mess.users}/>
            })
        }
    }

    return(
        <>
            <div className='messageHead'>
                   
                <div className='headInline'>
                    {/* {
                        photo ? (
                            <img src={photo?.photoURL}/>
                        ) : (
                            <p>f</p>
                        )
                    } */}
                     <div>
                        <h3>{chatUser}</h3>
                        <p>Last Seen</p>
                    </div>
                </div>
            </div>
            <div className='messageEnd'>
                {showMessage()}
                
            </div>
            <div>
                <MessageInput />
            </div>
        </>
    )
}

export default MessageScreen