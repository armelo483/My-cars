import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../../model/car.model';
import { CarsService } from '../../services/cars.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

carForm: FormGroup;
fileIsUploading = false;
fileUrl: string;
fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private carsService: CarsService,
              private router: Router){ }
			  
  ngOnInit() {
	  this.initForm();
  }
  
  initForm() {
    this.carForm = this.formBuilder.group({
      marque: ['', Validators.required],
      prix: ['', Validators.required],
      description: ''
    });
  }
  
    onSaveCar() {
    const marque = this.carForm.get('marque').value;
    const prix = this.carForm.get('prix').value;
    const description = this.carForm.get('description').value;
	
    const newCar = new Car(marque,prix,description);
	console.log('this.fileUrl testt');
	console.log(this.fileUrl);
	if(this.fileUrl && this.fileUrl !== '') {
      newCar.photo = this.fileUrl;
    }
	
    this.carsService.createNewCar(newCar);
    this.router.navigate(['/cars']);
  }
  
  
  detectFiles(event) {
	 
    this.onUploadFile(event.target.files[0]);
  }
  
  
    //Gere l'upload de l'image
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.carsService.uploadFile(file).then(
      (url:string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  
  

}




