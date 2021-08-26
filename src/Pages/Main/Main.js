import Header from '../../Components/Header/Header';
import Users from '../../Components/Users/Users';
import './Main.scss'
const Main = () =>{
    return(
        <>
            <div className='rootMain'>
                <Header title='Home' />

                <div className='mainContent'>
                    <div className='users'>
                        <Users />
                    </div>
                </div>
            </div>
        </>     
    )
}

export default Main;