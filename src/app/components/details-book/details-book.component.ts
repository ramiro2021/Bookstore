import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookIterface } from '../../models/book';


@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public book: BookIterface;
  ngOnInit() {
    const idBook = 'feqcyGJffRrPQH0xa9nm';
    this.dataApi.getOneBook(idBook).subscribe(book => {
      console.log(book);
    });
  }

}
