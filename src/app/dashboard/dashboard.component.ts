import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {UserModel} from '../UserModel';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username = "";
  currUser;
  role = "";
  newuser = "";
  newemail = "";
  user = "";

  loadusers:any;
  users:string[] = [];

  constructor(private userdata:UserService, route:ActivatedRoute, private router: Router, private socketservice:SocketService) { }

  ngOnInit() {
    this.socketservice.initSocket();
    this.socketservice.updatelist();
    //socket listening for an update to the list
    var getUser = Object.keys(sessionStorage);
    this.username = getUser[0];
    this.userdata.getitem(this.username).subscribe((data)=>{
      this.role = data[0].role;
      console.log(this.role);
    });
    this.userlist();
  }

  userlist() {
    this.users = [];
    this.userdata.getlist().subscribe((data)=>{
      this.loadusers = data;
    });
    this.userpush();
  }

  userpush() {
    this.userdata.getproductcount().subscribe((data)=>{
      if (data.usercount == 0) {
        return;
      } else {
        for (let i = 0; i < data.usercount; i++) {
          if (this.loadusers[i].username == this.username) {
            return; 
          } else {
            var userStr = this.loadusers[i].username.concat(" - Role: " + this.loadusers[i].role)
            this.users.push(userStr);
          }
        }
      }
    });
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
    console.log(deluser);
    if (confirm("Are you sure you want to delete " + val + " ?")){
      this.userdata.deleteitem(deluser).subscribe((data)=>{
        if(data.ok ==1){
          //request socket server to send an update
          console.log("into update stage");
          this.socketservice.updatelist();
          this.socketservice.prodcount();
          this.userlist();
        }
      });
    }
  }
    /*
    var delusersplit = val.split(" ");
    var deluser = delusersplit[0];
    localStorage.removeItem(deluser);
    this.users = [];
    this.userlist();
    alert("Removed " + deluser);
    */
}