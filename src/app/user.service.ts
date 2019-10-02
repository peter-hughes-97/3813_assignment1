import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }
  add(user:UserModel){
    return this.http.post<any>('http://localhost:3000/api/add',  user );
  }
  getlist(){
    return this.http.get<any>('http://localhost:3000/api/getlist');
  }

  getitem(userID){
    return this.http.post<any>('http://localhost:3000/api/getitem',  {'userid':userID} );
  }
  updateitem(user:UserModel){

    return this.http.post<any>('http://localhost:3000/api/update',  user );
  }
  deleteitem(deluser){
    return this.http.post<any>('http://localhost:3000/api/deleteitem',  {'user':deluser} );
  }
  checkvalidid(userID){
    return this.http.post<any>('http://localhost:3000/api/checkvalidid',  {'id':userID} );
  }
  getproductcount(){
    return this.http.get<any>('http://localhost:3000/api/prodcount');
  }
}
