import { useState } from 'react';
import { db , fire, storage} from '../../../Service/firebase';
import './AddInput.scss'
import { useAuthState } from 'react-firebase-hooks/auth';
const AddInput = () =>{
    const [title , setTitle] = useState('')
    const [image , setImage] = useState('') 
    const [user] = useAuthState(fire.auth())
    const UploadImage = (e) =>{ 
        var file = e.target.files[0];
        if(file){
            setImage(file)
        }
    }   

    const UploadSend = () =>{
        if(title !== ''){
            const upload = storage.ref(`images/${image.name}`).put(image)
            upload.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    // setProgress(progress)
                },
                error => {
                    console.log(error)
                },
                () =>{
                    storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                        db.collection('publication').add({
                            title:title,
                            photo:url,
                            user:user.email,
                            photoUser:user.photoURL
                        })
                    })

                }
            )
            
        }

        setTitle('')
        setImage('')
    }

    
    return(
        <>
            <div className='addCenter'>
                <div>
                    <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
                    <input type='file' placeholder='Photo' className='files'  onChange={UploadImage}/>
                    <button onClick={UploadSend}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default AddInput;