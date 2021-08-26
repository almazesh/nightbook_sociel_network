const getExsistEmail = ( users , userLoggedIn ) => (
    users?.filter(userTo => userTo !== userLoggedIn?.email)[0]
    
)


export default getExsistEmail


