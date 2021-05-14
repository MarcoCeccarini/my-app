import { Component, OnInit } from '@angular/core';
console.clear();

import { from, fromEvent, interval, of, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  buffer,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  first,
  last,
  map,
  mergeAll,
  mergeMap,
  reduce,
  scan,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeLast,
  takeUntil,
  takeWhile
} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    fromEvent(document.getElementById('myInput'), 'input')
  .pipe(
    map((ev: KeyboardEvent) => (ev.target as HTMLInputElement).value),
    filter(text => text.length > 2),
    debounceTime(1000),
    distinctUntilChanged(),
    mergeMap(text =>
      ajax.get(`https://jsonplaceholder.typicode.com/users?username=${text}`)
    )
    // map(res => res.response)
  )
  .subscribe(({ response }) => {
    console.log(response);
  });



  }

}
