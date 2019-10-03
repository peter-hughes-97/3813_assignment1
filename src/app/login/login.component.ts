import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../UserModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newusername:string = "";
  newemail:string = "";
  newpassword:string = "";
  newid:number=null;
  newobjid:string = "";
  newuser:UserModel;
  newUserMessage="";
  iderrormsg:string = "ID already exists, new ID required.";
  iderrormsg2:string = "";
  iderrorshow:boolean = false;
  noticeshow:boolean = false;

  username = "";
  password = "";
  

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.newuser = new UserModel("super","super@admin.com","super","Super Admin");
    this.userService.add(this.newuser).subscribe((data)=>{
      //add super user
    });
  }

  addNewUser(event) {
    //add user to db
    event.preventDefault();
    if (this.newusername == "" || this.newemail || this.newpassword) {
      alert("Please fill in all 3 fields");
      return;
    } else {
      this.newuser = new UserModel(this.newusername,this.newemail,this.newpassword,"Standard User");
      this.userService.add(this.newuser).subscribe((data)=>{
        console.log(data);
        this.noticeshow = true;
        if(data.err == null){
          this.newUserMessage = " new user (" + this.newusername + ") was added";
        }else{
          this.newUserMessage = data.err;
          return;
        }
        
        sessionStorage.setItem(this.newusername, "Standard User " + this.newemail + " " + this.newpassword);
        this.router.navigateByUrl('/chat');
      });
    }
  }

  login(event){
    //get user and check username and password match db
    event.preventDefault();
    this.userService.getitem(this.username).subscribe((data)=>{
      if(data[0].username == this.username && data[0].password == this.password){
        sessionStorage.setItem(this.newusername, "Standard User " + this.newemail + " " + this.newpassword);
        this.router.navigateByUrl('/chat');
      }else{
        alert("User Credentials Do Not Match");
        return;
      }
    });
  }
}