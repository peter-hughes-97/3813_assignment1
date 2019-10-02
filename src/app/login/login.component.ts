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
    event.preventDefault();
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
    /*
    this.submitted = true;

    if(this.addForm.valid){
      this.userService.addUser(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        //sessionStorage.setItem(this.newusername, "Standard User " + this.newemail + " " + this.newpassword);
        this.router.navigateByUrl('/chat');
      });
    }
    */
  }

  /*
  signup() {
    if (this.newusername.length == 0){
      alert("Please Enter a User Name");
      return;
    } else if (this.newemail.length == 0){
      alert("Please Enter an Email");
      return;
    } else if (this.newpassword.length == 0){
      alert("Please Enter a Password");
      return;
    }
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if(this.newusername == key) {
        alert("This user already exists!");
        return;
        }
      }
    sessionStorage.setItem(this.newusername, "Standard User " + this.newemail + " " + this.newpassword);
    localStorage.setItem(this.newusername, "Standard User" + this.newemail + " " + this.newpassword);
    alert("Welcome, " + this.newusername);
    this.router.navigateByUrl('/chat');
  }

  login() {
    if (this.username.length == 0){
      alert("No username entered");
      return;
    } else if (this.password.length == 0){
      alert("No password entered");
      return;
    }
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if(this.username == key) {
        var value = localStorage.getItem(key);
        var usersplit = value.split(" ");
        var passwordStr = usersplit[3];
        if(this.password == passwordStr) {
          sessionStorage.setItem(key, value);
          alert("Welcome, " + this.username);
          this.router.navigateByUrl('/chat');
          return;
        } else {
          alert("Incorrect Password");
          return;
        }
      }
    }
  }
  */
}