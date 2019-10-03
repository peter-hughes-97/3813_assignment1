import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }

  title = 'chat';

  clearlocal(){
    localStorage.clear();
    alert("Cleared Local Storage");
    location.reload();
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
