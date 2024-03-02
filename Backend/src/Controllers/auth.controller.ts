import { Request, Response } from "express";
import mssql from "mssql";
import Connection from "../dbHelpers/dbhelper";
import { sqlConfig } from "../Config/sqlConfig";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ExtendedUserRequest } from "../Middlewares/verifyToken";
import { loginUserValidation } from "../Validators/user.validator";

const dbhelper = new Connection();

export const loginUser = async (req: Request, res: Response) => {
  try {
    //From the request body, get the email and password
    const { email, password } = req.body;

    let {error} = loginUserValidation.validate(req.body)

    if(error){
        return res.status(404).json({
            error: error.details[0].message
        })

    }
    console.log("Hello");
    let user:any = (await (dbhelper.execute('loginUser', {
        email
    }))).recordset

    
    
    if (user[0]?.email == email) {
        console.log(user[0]);
      const correct_pwd = await bcrypt.compare(password, user[0].password)
      console.log(`Correct pw:${correct_pwd}`);
      

      if (!correct_pwd) {        
        return res.json({
          error: "Incorrect password",          
        });
      } else {
        const loginCredentials = user.map((response: any) => {
        const { Password, first_name, last_name, isDeleted, ...rest } =
          response;

        return rest;
      });

      const token = jwt.sign(
        loginCredentials[0],
        process.env.SECRET as string,
        {
          expiresIn: "3600s",
        }
      );

      return res.status(200).json({
        message: "Login success",
        token
      })
      }

      
    } else {
      res.json({
        error: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
        error
    })
  }
};




export const checkUserDetails = async (
  req: ExtendedUserRequest,
  res: Response
) => {
  if (req.info) {
    return res.json({
      info: req.info,
    });
  }
};




export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, last_name, first_name, password } = req.body;

    const pool = await mssql.connect(sqlConfig);

    let hashedPwd = await bcrypt.hash(password, 5);

    let result: any = await dbhelper.execute("resetPassword", {
      email,
      last_name,
      first_name,
      password,
    });

    if (result[0] < 1) {
      return res.json({
        message: "User not found",
      });
    } else {
      return res.json({
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    return res.sendStatus(501).json({
      error: error,
    });
  }
};
