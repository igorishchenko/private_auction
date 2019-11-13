import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Observable, Subject } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  results: Object;
  searchTerm$ = new Subject<string>();
  searchFlag: boolean = false;
  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results.results;
        if(results.results.length > 3000) {
          this.searchFlag = false;
        } else if(results.results.length == 0) {
          this.searchFlag = false;
        } else {
          this.searchFlag = true;
        }
      });
  }

  ngOnInit() {
    
  }

}
