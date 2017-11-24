import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-add-entry',
  template: `
    <div class="add-entry-main">
      <form (ngSubmit)="onSubmit()">
        <input
          [(ngModel)]="entryText"
          (keyup)="onKeyUp()"
          name="entryText"
          autofocus
          class="main-entry"
          type="text"
          placeholder="Search"
          autocomplete="off"
        >
        <input
          type="submit"
          class="submit-button"
          value="Go"
        >
      </form>
    </div>
  `
  // templateUrl: './add-entry.component.html',
  // styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {
  entryText: string;
  entryMatches: Entry[];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/add', this.entryText]);
  }

  onKeyUp() {
    if (this.entryText.length > 1) {
      this.entryMatches = this.dataService.getEntries(this.entryText);
      console.log('entry: ', this.entryText);
      console.log('entryMatches: ', this.entryMatches);
    }
  }

}
