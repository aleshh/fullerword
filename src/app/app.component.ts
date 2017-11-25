import { Component, DoCheck } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements DoCheck {
  title: string = "Title";
  showBack: boolean = false;

  constructor(
    // private activatedRoute: ActivatedRoute
    // private router: Router
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {}

  ngDoCheck() {
    let routeText = this.locationStrategy.path();
    let routeSections = routeText.split("/");
    switch(routeSections[1]) {
      case 'explore': this.title = "Explore Words";
        this.showBack = false;
        break;
      case 'tags': this.title = "Tags";
        this.showBack = true;
        break;
      case 'detail': this.title = routeSections[2];
        this.showBack = true;
        break;
      case 'add': this.title = "Add: " + routeSections[2];
        this.showBack = true;
        break;
      case 'edit': this.title = "Edit: " + routeSections[2];
        this.showBack = false;
        break;
      case 'tag': this.title = "Tag: " + routeSections[2];
        this.showBack = true;
        break;
      case 'add-entry': this.title = "Search";
        this.showBack = false;
        break;
      default:
        console.error('unknown route in app.component!');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
