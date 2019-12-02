import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }
  
  @ViewChild('imageUser', {static: true}) inputImageUser: ElementRef;
  public email: string;
  public pass: string;
  uploadPercent: Observable <number>;
  urlImage: Observable<string>;

  onUpload(e) {

    // console.log('subir', e);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = 'upload/profile_${id}';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
   }
  ngOnInit() {
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.pass).then((res) =>{
      this.authService.isAuth().subscribe(user =>{
        if (user){
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then(function(){
            console.log('user updated!');
          }).catch( function (error) {
            console.log('error');
          })
        }
      })
      this.router.navigate(['admin/list-books']);
    }).catch (err => console.log ('err', err.message));
  }

  onLoginGoogle(): void {

    this.authService.loginGoogleUser().then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));

  }

  onLoginFacebook() {

    this.authService.loginFacebookUser().then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));

  }
  onLoginRedirect(): void {

    this.router.navigate(['admin/list-books']);
  }

  
}
