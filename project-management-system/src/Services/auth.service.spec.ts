import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'


import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  
  let testingControler:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    testingControler = TestBed.inject(HttpTestingController)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Logs in user',()=>{
    const mockUser = {
      first_name:"Daniel",
      last_name: "Muriithi",
      email:"muriithikiamad1@gmail.com",
      password:"12345678"
    }

    service.loginUser(mockUser).subscribe(res=>{
      expect(res.message).toEqual("Logged in successfully")
    })

    const mockReq = testingControler.expectOne('http://localhost:4500/users')

    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toBe(mockUser)

    mockReq.flush({
      message:"Logged in successfully"
    })
  })
});
