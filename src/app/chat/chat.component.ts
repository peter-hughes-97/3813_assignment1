import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {FormsModule} from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username = "";
  role = "";
  groups: string[] = [];
  groupmembers: string[] = [];
  messagecontent:string="";
  newgroup:string="";
  newmember = "";
  messages:string[] = [];
  ioConnection:any;

  constructor(private socketService:SocketService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initIoConnection();
    var getUser = Object.keys(sessionStorage);
    var getRole = sessionStorage.getItem(getUser[0]);
    this.username = getUser[0];
    this.role = getRole;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key[0] == "#") {
        var value = localStorage.getItem(key);
        this.groups.push(key);
        this.groupmembers.push(value);
      }
      continue;
    }
  }
  private initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
    .subscribe((message:string) => {
      this.messages.push(message);
    });
  }
  private chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent=null;
    } else {
      console.log("no message");
    }

  }

  createGroup() {
    var groupkey = ("# ").concat(this.newgroup)
    localStorage.setItem(groupkey, "");
    location.reload();
  }

  addmember(val) {
      var currentgroup = localStorage.getItem(val);
      var groupStr = currentgroup.concat(" " + this.newmember);
      localStorage.setItem(val, groupStr);
      alert("Added " + this.newmember + " to " + val);
      location.reload();
  }
}
