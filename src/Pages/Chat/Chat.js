import './Chat.scss'
import Header from '../../Components/Header/Header';
import { BsSearch } from 'react-icons/bs'
import { BiCommentAdd } from 'react-icons/bi'
import { db, fire } from '../../Service/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatList from '../../Components/ChatList/ChatList';
import Message from '../../Components/Message/Message';
import { Route, Switch } from 'react-router-dom';
const Chat = () => {
    const [user] = useAuthState(fire.auth())
    const [userChatRef] = useCollection(db.collection('chats').where('users', 'array-contains', user.email))

    const createChat = () => {
        const input = prompt('Please enter an email addres for the user you with to chat with')

        if (!input) return;

        if (input && !chatAlreadyExsist(input) && input !== user.email) {
            db.collection('chats').add({
                users: [ user.email , input]
            })
        }

    }
    const chatAlreadyExsist = (exsistEmail) =>
        !!userChatRef?.docs.find(chat => chat.data().users.find(user => user === exsistEmail)?.length > 0
    )
    return (
        <>
            <div className='chat'>

                <Header title='Messanger' />

                <div className='chatContent'>
                    <div className='chatUser'>
                        <div className='chatSearch'>
                            <input type='text' placeholder='Search in chats' />
                            <BsSearch className='chatSearchIcon' />
                        </div>
                        <button className='newChat' onClick={createChat}> <BiCommentAdd /> </button>

                        <div className='chatListOfUsers'>
                            {
                                userChatRef?.docs.map(chat => (
                                    <ChatList key={chat.id} id={chat.id} users={chat.data().users}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className='chatMessage'>
                        <Switch>
                            <Route path='/chat/message/:id'>
                                <Message />
                            </Route>
                        </Switch>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Chat;