import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUserDetails } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginUser(user_details:loginUserDetails ){
    return this.http.post<{message:string, token:string, error:string}>('http://localhost:4500/auth/login', user_details)
  }

  readToken(token:string){
    return this.http.get<{info:{user_id: string,first_name:string, last_name:string,email:string}}>('http://localhost:4500/auth/checkdetails', {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token':token
      })
    })
  }
}