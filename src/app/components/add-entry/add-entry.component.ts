import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-entry',
  template: `
    <div class="add-entry-main">
      <form (ngSubmit)="onSubmit()">
        <input 
          [(ngModel)]="entryText" 
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

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/edit', this.entryText]);
    
    // this.dataService.addEntry(text);
  }

}
