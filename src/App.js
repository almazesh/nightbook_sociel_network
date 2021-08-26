import Routes from "./Pages/Routes/Routes"
import { fire } from "./Service/firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from "./Components/Loader/Loader";
const App = () =>{
    const [user , loading]= useAuthState(fire.auth())


   


    if(loading){
        return(
            <div style={{display:'flex' , justifyContent:'center' , height:'100vh' , alignItems:'center'}}>
                <Loader />
            </div>
        )
    }else{
        return(
            <>  
                <Routes user={user} />
            </>
        )
    }
}

export default App