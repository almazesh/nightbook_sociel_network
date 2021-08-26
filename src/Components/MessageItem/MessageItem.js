import './MessageItem.scss'
import { useAuthState } from 'react-firebase-hooks/auth';
import { fire } from '../../Service/firebase';
import moment from 'moment';

const MessageItem = (props) =>{
    const [user] = useAuthState(fire.auth())
    const a = Object.entries(props.messages)   
    const time = props.messages.timestamp
    return(
        <>
            <div className='messItemParent'>
                <p className={props.user === user.email ? 'reciever' : 'sender'}>
                    {a[0][1]}
                    <li>{time ? moment(time).format('LT') : '...'}</li>
                </p>
            </div>
        </>
    )
}

export default MessageItem