import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { BookIterface } from '../../models/book';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }

  ngOnInit() {
  }
  onSaveBook(bookForm: NgForm): void{
    //new 
    this.dataApi.addBook(bookForm.value);
    //update
  }
}
