import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Car } from '../model/car.model';
import Datasnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';

@Injectable()
export class CarsService {
	
  cars: Car[] = [];
  carsSubject = new Subject<Car[]>();
  id: string;
  ref: string; 
  task ;
  uploadState; 
  uploadProgress;
  downloadURL ;
  
  
  
  
  constructor() {
    this.getCars();
 }
  
  broadCastCars(){
  this.carsSubject.next(this.cars);//next(): on envoie cela à tous les observers qui ecoutent
  }
  
  
  getCars() {
    firebase.database().ref('/cars')
      .on('value', (data: DataSnapshot) => {
          this.cars = data.val() ? data.val() : [];
          this.broadCastCars();
        }
      );
  }

  getSingleCar(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/cars/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  
  
  createNewCar(newCar: Car) { console.log(newCar);
  console.log('this =>cars is here ');
 
    this.cars.push(newCar);
    this.saveCars();
	console.log(this.cars);
    this.broadCastCars();
  }

  removeCar(car: Car) {
    const carIndexToRemove = this.cars.findIndex(
      (carEl) => {
        if(carEl === car) {
          return true;
        }
      }
    );
    this.cars.splice(carIndexToRemove, 1);
    this.saveCars();
    this.broadCastCars();
  }
  

  
  
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
		const imagePath = 'https://firebasestorage.googleapis.com/v0/b/listofmycars.appspot.com/o/';
		
		
		//images%2F1543250838534huracan.png?alt=media&token=99f77f12-48c2-4490-93cb-bc036f0fd1f3
        
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file).then(snapshot => {
           return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
        }).then(downloadURL => {
       console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
       return downloadURL;
      });
		
         
		  console.log('upload.snapshot.downloadURL: ');
		  //console.log(upload.snapshot.downloadURL);
		  
		  console.log(upload);
		  //console.log(upload.__zone_symbol__value[0]);
		  //console.log(upload.snapshot.task.location_.path);
        /*upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
			resolve(upload.snapshot.downloadURL);
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.task.location_.path);
          }
        );*/
		
		/* ids = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(ids);
		this.task = this.ref.put(event.target.files[0]);
		this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
		this.uploadProgress = this.task.percentageChanges();
		//this.downloadURL = this.ref.getDownloadURL();
		
		
		this.task.snapshotChanges().pipe(
  finalize(() => {
    this.downloadURL = this.ref.getDownloadURL(); // <-- Here the downloadURL is available.
  })
).subscribe();*/
resolve(upload);
      }
    );
}


removeCar(car: Car){
	
	 if(car.photo) {
      const storageRef = firebase.storage().refFromURL(car.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const carIndexToRemove = this.cars.findIndex(
      (carEl) => {
        if(carEl === car) {
          return true;
        }
      }
    );
    this.cars.splice(carIndexToRemove, 1);
    this.saveCars();
    this.broadCastCars();
}


  
 
  
  saveCars() {
	  
	   

	  firebase.database().ref('/cars').set(this.cars);
	  /*var carArr = this.cars;
	  firebase.auth().onAuthStateChanged(function(user, carArr) {
	  if (user) {
    // User is signed in.
	firebase.database().ref('/cars').set(carArr);
  }else{
	  console.log('user signed out');
	  
  }
    
  */
  }
}
