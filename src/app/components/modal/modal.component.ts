import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('btnClose', {static: true}) btnClose: ElementRef;
  ngOnInit() {
  }
  onSaveBook(bookForm: NgForm) {

    if (bookForm.value.id == null) {

    this.dataApi.addBook(bookForm.value);
    } else {

      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
