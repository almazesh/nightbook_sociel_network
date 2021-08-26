import { db } from "../../Service/firebase";
import { useParams } from "react-router-dom";
import MessageScreen from "../MessageScreen/MessageScreen";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
const Message = () =>{
    const params = useParams()
    const [base , setBase] = useState([])   
    useEffect(() =>{
        async function User(){
            const ref = db.collection('chats').doc(params.id)
    
            const chatRes = await ref.get()
    
    
           const arr = {...chatRes.data()}
    
           setBase(arr)
        }
    User()

    } , [base , params.id])

    const [messageShot] = useCollection(
        db.collection('chats')
        .doc(params.id) 
        .collection('messages')
        .orderBy('timestamp' , 'asc')
    ); 


    return(
        <>
            <div>
                
                <MessageScreen messages={ getServerSideProps(params)} userInfo={base} messageShot={messageShot} />
            </div>
        </>
    )
}

export default Message;



export async function getServerSideProps(context){
    const ref = db.collection('chats').doc(context.id)

    const messagesRes = await ref
    .collection('messages')
    .orderBy("timestamp" , 'asc')
    .get()

    const messages = messagesRes.docs.map(doc => ({
        id:doc.id,
        ...doc.data(),
    })).map(messages =>({
        ...messages,
        timestamp:messages.timestamp
    }))


    const chatRes = await ref.get()

    const chat = {
        id:chatRes.id,
        ...chatRes.data()
    }
    

    return {
        props:{
            messages:messages,
            chat:chat
        }
    }
}

