import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newusername = "";
  newemail = "";
  newpassword = "";
  username = "";
  password = "";

  constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key == "super") {
        return;
      }
    }
    localStorage.setItem("super", "Super Admin super@admin.com super");
  }

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
}