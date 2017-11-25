import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { UtilitiesService } from '../../services/utilities.service';
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
    private dataService: DataService,
    private utilities: UtilitiesService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    let urlEncodedText = this.utilities.urlEncode(this.entryText);
    this.router.navigate(['/add', urlEncodedText]);
  }

  onKeyUp() {
    if (this.entryText.length > 1) {
      this.entryMatches = this.dataService.getEntries(this.entryText);
      if (this.entryMatches && this.entryMatches.length == 0) {
        this.entryMatches = null;
      }
      this.tagMatches = this.dataService.getTagList(this.entryText);
      if (this.tagMatches && this.tagMatches.length == 0) {
        this.tagMatches = null;
      }
    } else {
      this.entryMatches = null;
      this.tagMatches = null;
    }

  }

}
