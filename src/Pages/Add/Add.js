import Header from '../../Components/Header/Header';
import './Add.scss'
import AddInput from './AddInput/AddInput';

const Add = () =>{
    return(
        <>
            <div className='addParent'>
                <Header title='Publication +' />

                <div className='addContent'>
                    <AddInput />
                </div>
            </div>

        </>
    )
}

export default Add