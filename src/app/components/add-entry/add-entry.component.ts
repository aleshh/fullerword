import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html'
})
export class AddEntryComponent implements OnInit {
  entryText: string;
  entryMatches: Entry[];
  tagMatches: object[];

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
      if (this.entryMatches && this.entryMatches.length == 0) {
        this.entryMatches = null;
      }
      // this.tagMatches = this.dataService.getTagList(this.entryText);
      if (this.tagMatches && this.tagMatches.length == 0) {
        this.tagMatches = null;
      }
      console.log('word matches: ', this.entryMatches);
      console.log('tag matches: ', this.tagMatches);
      // if (this.entryMatches.length > 0) {
        // console.log('word matches: ', this.entryMatches[0].text);
      // }
    } else {
      this.entryMatches = null;
      this.tagMatches = null;
    }

  }

}
