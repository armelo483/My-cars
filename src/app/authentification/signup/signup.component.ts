import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

signupForm: FormGroup;
errorMessage: string;

constructor(private formBuilder: FormBuilder,
              private AuthentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit() {
	  this.initForm();
  }

  initForm() {
	  //méthode réactive de creation de Form
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    
    this.AuthentificationService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/cars']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  
}
