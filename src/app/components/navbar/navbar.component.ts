import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public app_name: string = 'BookStore';
  public isLogged: boolean = true;

  
  ngOnInit() {
    this.getCurentUser();
  }
  getCurentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('usuario logeado');
        this.isLogged = true;
      }
      else {
        console.log('usuario no logeado');
        this.isLogged = false;
      }
    } );

  }
  onLogout() {
    this.afsAuth.auth.signOut();
  }
}
