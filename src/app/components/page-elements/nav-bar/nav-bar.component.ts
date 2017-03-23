import { Component, OnInit }  from '@angular/core';
import { Location }           from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  tabLinks = [
      {label: 'Animal', link: 'animal'},
      {label: 'Person', link: 'person'},
      {label: 'Place', link: 'place'},
    ];
    public activeLinkIndex: number;

  constructor(
        private location: Location
  ) { }

  ngOnInit() {
    console.log('Location: ', this.location);
  }

}
