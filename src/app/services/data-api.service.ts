import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'; 
import { BookIterface } from '../models/book';
import { Observable } from 'rxjs/internal/observable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) { 
    this.booksCollection= afs.collection<BookIterface>('books');
    this.books = this.booksCollection.valueChanges();
  }
  private booksCollection : AngularFirestoreCollection<BookIterface>;
  private books: Observable<BookIterface[]>;
  private bookDoc: AngularFirestoreDocument<BookIterface>;
  private book: Observable<BookIterface>;
  getAllBooks() {
    return this.books = this.booksCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as BookIterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
   }
   getOneBook(idBook: string){

    this.bookDoc = this.afs.doc<BookIterface>(`books/${idBook}`);
    return this.book = this.bookDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists == false) {
        return null;
      }else{
        const data = action.payload.data() as BookIterface;
        data.id = action.payload.id;
        return data;
      }
    } ));
   }

  addBook() { }

  updateBook() { }

  deleteBook() { }
}
