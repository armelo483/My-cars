import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private AuthentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit() {
	  this.initForm();
  }

  
  initForm() {
	  //méthode réactive de creation de Form
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
   onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    
    this.AuthentificationService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/cars']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  
}
