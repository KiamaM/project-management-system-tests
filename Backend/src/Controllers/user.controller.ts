import { Request, Response } from "express"
import { v4 } from "uuid"
import Connection from "../dbHelpers/dbhelper"
import bcrypt, { hash } from 'bcrypt'
import { users } from "../Interfaces/user.interface"




//Create a new instance of the dbhelper class
const dbhelper = new Connection





export const createUser = async (req:Request, res:Response)=>{
 try {
    const id = v4()
    console.log(id);
    

    const{first_name, last_name, email, password}:users = req.body

    const hashed_pwd = await bcrypt.hash(password, 5)
    console.log("I created this", hashed_pwd);
    

    let result = await (dbhelper.execute('registerUsers', {
       user_id:id ,first_name, last_name, email, hashed_pwd
    }))

    if(result.rowsAffected[0] > 1){
        return res.json({
            error:'Account creation failed'
        })
    }else{
        
    return res.json({
        message:'Account created successfully',
    })
    }

 } catch (error:any) {
    return res.json({
        error:error.originalError.info.message
    })
 }
}








export const getUsers = async(req:Request, res:Response)=>{
    try {

        let users = (await (dbhelper.execute('getALLUsers'))).recordset


        return res.json({
            users: users
        })
    } catch (error:any) {
        return res.json({
            error:error.originalError.info.message
        })
    }
}









export const getOneUser = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id

        let user = await dbhelper.execute("getOneUser", {user_id:id})


        return res.json({
            user
        })
    } catch (error) {
        return res.json(error)
    }
}







export const updateUser = async(req:Request, res: Response)=>{
    try {
        const id = req.params.id

        const{first_name, last_name, email, password}:users = req.body

        const result = await dbhelper.execute("updateUser", {
            user_id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password 
        })

        console.log(result);
        

        return res.status(200).json({
            message: "User updated successfully"
        })


    } catch (error) {
        return res.status(500).json({ 
            error: "Internal Server Error" 
        });
    }
}


export const deleteUser = async(req:Request, res: Response)=>{
    try {
        const user_id:any = req.params?.['id']

        const result = await dbhelper.execute("deleteUser",{user_id})

        

        return res.status(200).json({
            message: "User deleted successfully"
        })


    } catch (error) {
        return res.status(500).json({ 
            error: "Internal Server Error" 
        });
    }
}

