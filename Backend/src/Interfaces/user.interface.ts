export interface users{
    first_name:string
    last_name:string
    email:string
    password:string    
}

export interface loginUserDetails{
    user_id: string,
    first_name:string
    last_name:string
    email:string
    password:string  
    isWelcomed: boolean,
}