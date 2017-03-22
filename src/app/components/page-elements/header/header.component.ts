import { Component, OnInit } from '@angular/core';

declare var gapi:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signOut(): void {
      console.log('Signout called');
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then( () => {
        console.log('User signed out.');
      });
    }
}
