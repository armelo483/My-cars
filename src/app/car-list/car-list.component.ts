import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car.model';
import { Subscription } from 'rxjs/Subscription';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy{

cars: Car[];
carsSubscription: Subscription;
iterateArray = [1,2,3];

  constructor(private carsService: CarsService) { }

  ngOnInit() {
	  this.carsSubscription = this.carsService.carsSubject.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
		console.log(this.cars);
      }
    );
    this.carsService.broadCastCars();
  }
  
    
  onDeleteCar(car: Car) {
    this.carsService.removeCar(car);
  }


}
