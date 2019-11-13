import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public activeIndex: number;

  constructor() { }

  ngOnInit() {
  }

  activeTab(id: number): number {
    return this.activeIndex = id;
  }
}
