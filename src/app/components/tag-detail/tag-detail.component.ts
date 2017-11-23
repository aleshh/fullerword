import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Entry } from '../../models/Entry';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnInit {
  tag: string;
  entries: Entry[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.tag = this.route.snapshot.paramMap.get('tag');
    this.entries = this.dataService.getEntriesByTag(this.tag);
  }

}
