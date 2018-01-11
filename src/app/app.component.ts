import { Component, DoCheck } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';

import { UtilitiesService } from './services/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements DoCheck {
  title: string = "Title";
  showBack: boolean = false;
  showSettings: boolean = false;

  constructor(
    // private activatedRoute: ActivatedRoute,
    // private router: Router,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private utilities: UtilitiesService
  ) {}

  ngDoCheck() {
    let routeText = this.locationStrategy.path();
    let routeSections = routeText.split("/");
    let routeFromUrl;
    let wordFromUrl;

    if (routeSections[2]) {
      wordFromUrl = this.utilities.decodeUrl(routeSections[2]);
    }
    this.showBack = false;
    this.showSettings = false;
    switch(routeSections[1]) {
      case 'explore': this.title = "Explore Words";
        this.showSettings = true;
        break;
      case 'tags': this.title = "Tags";
        break;
      case 'settings': this.title = "Settings";
        this.showBack = true;
        break;
      case 'detail': this.title = wordFromUrl;
        this.showBack = true;
        break;
      case 'add': this.title = "Add: " + wordFromUrl;
        this.showBack = true;
        break;
      case 'edit': this.title = "Edit: " + wordFromUrl;
        this.showBack = true;
        break;
      case 'tag':
        let list: string[] = wordFromUrl.split('.');
        let str: string = list.join(', ');
        if (list.length == 1) {
          this.title = "Tag: " + list[0];
        } else {
          this.title = "Tags: " + str;
        }
        this.showBack = true;
        break;
      case 'add-entry': this.title = "Search/Add Word";
        break;
      case 'about': this.title = "About FullerWord";
          this.showBack = true;
        break;
      default:
        console.error('unknown route in app.component!');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
