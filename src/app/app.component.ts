import { Component, DoCheck } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <header><h1>{{ title | titlecase }}</h1></header>
    <div class="main">
      <router-outlet></router-outlet>
    </div>
    <nav>
      <a class="nav-button" routerLink="/add-entry">Add Entry</a>
      <a class="nav-button" routerLink="/explore">Explore</a>
      <a class="nav-button" routerLink="/tags">Tags</a>
    </nav>
  `
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title: string = "Title";

  constructor(
    // private activatedRoute: ActivatedRoute
    // private router: Router
    private locationStrategy: LocationStrategy
  ) {}

  ngDoCheck() {
    let routeText = this.locationStrategy.path();
    let routeSections = routeText.split("/");
    switch(routeSections[1]) {
      case 'explore': this.title = "Explore Words"; break;
      case 'tags': this.title = "Tags"; break;
      case 'detail': this.title = routeSections[2]; break;
      case 'add': this.title = "Add: " + routeSections[2]; break;
      case 'edit': this.title = "Edit: " + routeSections[2]; break;
      case 'add-entry': this.title = "Search"; break;
    }
  }
}
