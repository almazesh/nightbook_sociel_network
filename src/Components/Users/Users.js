import { db } from "../../Service/firebase"
import { useState } from 'react';
import Card from './Card/Card';
import Loader from '../Loader/Loader';

const Users = () =>{
    const [base , setBase] = useState(null)

        db.collection('publication').get()
        .then(res => {
            setBase(res)
            
        })

   
   
    return( 
        <>
            {
                base?.length === 0 ? (
                    <p>Empty</p>
                ) : base ? (
                    base.docs.map(item =>(
                        <Card  user={item.data().user} title={item.data().title} photo={item.data().photo} photoUser={item.data().photoUser} />
                    ))
                ) : (
                    <div style={{display:'flex' , justifyContent:'center' , height:'100vh' , alignItems:'center'}}>
                         <Loader />
                    </div>
                )
            }
        </>
    )
}
export default Users