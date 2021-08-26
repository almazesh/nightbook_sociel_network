import './MessageInput.scss'
import {FaSmile} from 'react-icons/fa'
import {RiMailSendFill} from 'react-icons/ri'
import { useState } from 'react'
import { db, fire } from '../../Service/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom'

const MessageInput =  () =>{
    const [input , setInput] = useState('')
    const [user] = useAuthState(fire.auth())
    const params = useParams()
    
    const sendMessage = (e) =>{
        e.preventDefault();
        
        if(input !== ''){
            db.collection('users').doc(user.uid).set({
                lastSeen:fire.firestore.FieldValue.serverTimestamp(),
    
            },
            {merge:true}
            
            );
    
            db.collection('chats').doc(params.id).collection('messages').add({
                timestamp:fire.firestore.FieldValue.serverTimestamp(),
                messsage:input ,
                user:user.email,
                photoURL:user.photoURL
            })
    
            setInput('')
        }
    }
    return(
        <>
            <div className='writeParent'>
                <div className='write'>
                    <FaSmile className='messIcon'/>
                    <input 
                        value={input}
                        type='text'
                        placeholder='Chat a message' 
                        onChange={e => setInput(e.target.value)}
                    />
                    <RiMailSendFill className='messIcon2'   onClick={sendMessage}/>  
                </div>
            </div>
        </>
    )
}

export default MessageInput;