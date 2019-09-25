import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = "";
  role = "";
  newuser = "";
  newemail = "";
  user = "";
  users: string[] = [];

  constructor(private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var getUser = Object.keys(sessionStorage);
    var getRole = sessionStorage.getItem(getUser[0]);
    this.username = getUser[0];
    var rolesplit = getRole.split(" ");
    var newrole = rolesplit[0].concat(" " + rolesplit[1]);
    this.role = newrole;
    this.userlist();
  }

  userlist() {
    var loadusers = Object.keys(localStorage);
    for (let i = 0; i < loadusers.length; i++) {
      let key = localStorage.key(i);
      if (key == this.username) {
        continue;
      } else if (key[0] == "#") {
        continue;
      }
      var value = localStorage.getItem(key);
      var userStr = key.concat(" - Role: " + value)
      this.users.push(userStr);
    }
  }

  makeUser() {
    if (this.newuser.length == 0){
      alert("No Username Entered");
      return;
    } else if (this.newemail.length == 0) {
      alert("No Email Entered");
      return;
    }
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if(this.newuser != key) {
        localStorage.setItem(this.newuser, "Group Admin " + this.newemail);
        var newUserStr = this.newuser.concat(" - Role: Group Admin " + this.newemail);
        this.users.push(newUserStr);
        alert("User " + this.newuser + " added");
        this.newuser = '';
        this.newemail = '';
        return;
      } else {
        alert("This User Already Exists!");
        return;
      }
    }
  }

  makeSuper(val) {
    var newsupersplit = val.split(" ");
    var newsuper = newsupersplit[0];
    localStorage.setItem(newsuper, "Super User");
    alert(newsuper + " is now a Super User");
  }

  deleteUser(val) {
    var delusersplit = val.split(" ");
    var deluser = delusersplit[0];
    localStorage.removeItem(deluser);
    this.users = [];
    this.userlist();
    alert("Removed " + deluser);
  }
}