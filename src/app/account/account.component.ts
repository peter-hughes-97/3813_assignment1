import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username = "";
  role = "";
  email = "";
  messagecontent:string="";
  messages:string[] = [];
  ioConnection:any;

  constructor(private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var getUser = Object.keys(sessionStorage);
    var getRole = sessionStorage.getItem(getUser[0]);
    this.username = getUser[0];
    var rolesplit = getRole.split(" ");
    var newrole = rolesplit[0].concat(" " + rolesplit[1]);
    this.role = newrole;
    this.email = rolesplit[2];
  }
}
