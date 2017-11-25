import { Component, DoCheck } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <a
        (click)="goBack()"
        class="header-back-button"
        *ngIf="showBack"
      > < </a>
      <h1>{{ title | titlecase }}</h1>
    </header>
    <div class="main">
      <router-outlet></router-outlet>
    </div>
    <nav>
      <a class="nav-button" routerLink="/add-entry">Add Entry</a>
      <a class="nav-button" routerLink="/explore"><i-compass></i-compass></a>
      <a class="nav-button" routerLink="/tags">Tags</a>
    </nav>
  `
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
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
