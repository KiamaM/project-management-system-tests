import { TestBed } from '@angular/core/testing';

import { RegisterService } from './user.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { registerUser } from '../Interfaces/register.interface';


describe('UserService', () => {
  let service: RegisterService;

  let testingControler:HttpTestingController


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterService);
    testingControler = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Registers a user', ()=>{

    let mockUser = {
      first_name:"Daniel",
      last_name: "Muriithi",
      email:"muriithikiamad1@gmail.com",
      password:"12345678"
    }

    service.registerUser(mockUser).subscribe(res=>{
      expect(res.message).toEqual("Account created successfully")
    })

    const mockReq = testingControler.expectOne('http://localhost:4500/users')

    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toBe(mockUser)

    mockReq.flush({
      message:"Account created successfully"
    })
  })
});
