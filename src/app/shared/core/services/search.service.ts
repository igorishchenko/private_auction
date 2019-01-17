import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class SearchService {
  public baseUrl: string = 'https://api.cdnjs.com/libraries';
  public queryUrl: string = '?search=';

  constructor (private http: Http) { }

  search (terms: Observable<string>) {
    return terms.pipe(debounceTime(0),
                distinctUntilChanged(),
                switchMap(term => this.searchEntries(term))
              );
  }

  searchEntries(term) {
    return this.http
            .get(this.baseUrl + this.queryUrl + term)
            .pipe(map(res => res.json()));
  }
}
