import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  
  constructor(private authService: AuthentificationService) {
  }

  ngOnInit() {
	  
	  //Check si l'user est connecté au chargement de ce component
	  firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
	
	
	console.log('Auth estsss: ');
	  console.log(this.isAuth);
  }
  
  onSignOut() {
    this.authService.signOutUser();
  }

}
