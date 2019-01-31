import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quoteData;

  constructor(private quoteService: DataService) { }

  ngOnInit() {}

  requestQuote() {
    this.quoteService.getQuote().subscribe(res => {
      console.log(res);
      // this.quoteData = res['quotes'][0];
      this.quoteData = res;
    });
  }

}
