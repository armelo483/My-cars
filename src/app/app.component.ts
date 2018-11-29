import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	
  title = 'MY-Cars';
  constructor() {
   const config = {
    apiKey: "AIzaSyA6qb7WXQW8eIq6EU4YKh_NI6LdpI17SgQ",
    authDomain: "listofmycars.firebaseapp.com",
    databaseURL: "https://listofmycars.firebaseio.com",
    projectId: "listofmycars",
    storageBucket: "listofmycars.appspot.com",
    messagingSenderId: "1080465776595"
  };
  firebase.initializeApp(config);
  
 }
}

