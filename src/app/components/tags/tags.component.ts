import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { log } from 'util';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {
  tagList: object[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.tagList = this.dataService.getTagList();
  }

}
