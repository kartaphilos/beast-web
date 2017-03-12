import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  tabLinks = [
      {label: 'Animal', link: 'animal'},
      {label: 'People', link: 'people'},
      {label: 'Location', link: 'location'},
    ];
    activeLinkIndex = 0;

  constructor() { }

  ngOnInit() {
  }

}
