import './Card.scss'

const Card = ({user , photo , photoUser , title}) =>{
    
    return(
        <>
            <div className='card'>
                <div className='card-header'>
                    <img src={photoUser} alt='' />
                    <h2>{user}</h2>
                </div>
                <div className='card-image'>
                    <img src={photo} alt='' />
                </div>
                <div className='card-title'>
                    <p>{title}</p>
                </div>
            </div>
        </>
    )
}
export default Card;