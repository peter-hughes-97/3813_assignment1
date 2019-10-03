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
  image = "";
  url = '';
  imagefolder = "assets/images/";

  constructor(private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.image = ("assets/images/default.png")
    var getUser = Object.keys(sessionStorage);
    var getRole = sessionStorage.getItem(getUser[0]);
    this.username = getUser[0];
    var rolesplit = getRole.split(" ");
    var newrole = rolesplit[0].concat(" " + rolesplit[1]);
    this.role = newrole;
    this.email = rolesplit[2];
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event:any) => {
            this.url = event.target.result;
            this.image = this.url;
            event.target.files.path = this.imagefolder + event.target.files.name;
        }

        reader.readAsDataURL(event.target.files[0]);
    }
}
}
