import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  email = "";

  constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key == "super") {
        return;
      }
    }
    localStorage.setItem("super", "Super Admin super@admin.com");
  }

  login() {
    if (this.username.length == 0){
      alert("Please Enter a User Name");
      return;
    }
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      var value = localStorage.getItem(key);
      if(this.username == key) {
        sessionStorage.setItem(key, value);
        alert("Welcome Back, " + key);
        this.router.navigateByUrl('/chat');
        return;
        }
      }
    sessionStorage.setItem(this.username, "Standard User " + this.email);
    localStorage.setItem(this.username, "Standard User" + this.email);
    alert("Welcome, " + this.username);
    var test = localStorage.getItem(this.username);
    alert(test);
    this.router.navigateByUrl('/chat');
  }

}