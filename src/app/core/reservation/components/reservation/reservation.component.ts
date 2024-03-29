import { Component, OnInit } from '@angular/core';
import {  Reservation} from '../../interfaces/reservation';
import { ReservationService } from '../../services/reservation.service';
import { ResponData } from 'src/app/shared/interfaces/respon-data';
import { Links, ResponseDataReservations } from '../../interfaces/response-data-reservations';
import { map } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{

  listReservations:Reservation[]=[];
  paginateBy: number = 0;
  links:Links[]=[]
  statusActif:string = ""
  openModalShow:boolean = false;
  ShowREservation!:Reservation;
  actifLoader: boolean = false;



  constructor(
    private reservationService:ReservationService,
    private alertService:AlertService
  ){}

  ngOnInit(): void {
   this.getData();
  }

  getStatus(status:string){
    this.statusActif = status
    if(this.statusActif == ""){
      this.getData();
    }
    else{
      this.getByStatus("1",this.statusActif)
    }
  }

  otherPage(page: string) {
    if (this.statusActif == "") {
      this.getData(page);
    }
    else{
      this.getByStatus(page,this.statusActif)
    }
  }

  getData(page: string = "1"){
    this.paginateBy = 0;

    this.reservationService.getData<any>('reservations?page=' + page).pipe(map((data) => {
      console.log(data);

      return {
        message: data.message,
        status: data.status,
        links: data.links,
        data: data.data
      }
    })).subscribe(
      {
        next: (data: any) => {
          this.listReservations = data.data
          this.links = data.links
          console.log(this.links);

        },
        error: (err) => {
          console.log(err);
          this.alertService.showAlert({
            title: "Erreur",
            text: err.message,
            icon: "warning"
          })
        },
        complete: () => {
          console.log("completed");
        }
      }

    )

  }


  getByStatus(page: string = "1",status:string){
    this.paginateBy = 1;
    this.reservationService.getData<any>(`reservations/status/${status}?page=${page}`).pipe(map((data) => {
      console.log(data);

      return {
        message: data.message,
        status: data.status,
        links: data.links,
        data: data.data
      }
    })).subscribe(
      {
        next: (data: any) => {
          this.listReservations = data.data
          this.links = data.links
          console.log(this.links);

        },
        error: (err) => {
          console.log(err);
          this.alertService.showAlert({
            title: "Erreur",
            text: err.message,
            icon: "warning"
          })
        },
        complete: () => {
          console.log("completed");
        }
      }

    )

  }

  openModalFunc(id?:number){
    this.openModalShow = !this.openModalShow
    if(id){
      this.ShowREservation = this.listReservations.find(res => res.id === id) as Reservation
    }
    console.log(this.ShowREservation);
  }

  acceptReservation(id:number){
    this.alertService.showConfirmation("Accepter la reservation", "Voulez aller accepter cette reservation").then((result) => {
      if (result.isConfirmed) {
        this.actifLoader = true
        this.reservationService.getData<ResponData<Reservation>>(`reservations/accept/${id}`).subscribe(
          {
            next: (data) => {
              // this.sweeAlertFunction(data.message, 'success');
            const index = this.listReservations.findIndex(res => res.id === id);
            if (index !== -1 && !Array.isArray(data.data)) {
              Object.assign(this.listReservations[index], data.data);
            }
            this.openModalShow = false;
              this.alertService.showAlert(
                {
                 title: "Success",
                 text: data.message,
                 icon: "success"
                }
                )
            },
            error: (error) => {
                console.log(error);
                 this.actifLoader = false;

            },
            complete: () => {
                 this.actifLoader = false

            }
          }
        )
      }
    })
  }

  annulerReservation(id:number){
    this.alertService.showConfirmation("Annuler la reservation", "Voulez-vous Annuler cette reservation?").then((result) => {
      if (result.isConfirmed) {
        this.actifLoader = true
        this.reservationService.getData<ResponData<Reservation>>(`reservations/annuler/${id}`).subscribe(
          {
            next: (data) => {
              // this.sweeAlertFunction(data.message, 'success');
            const index = this.listReservations.findIndex(res => res.id === id);
            if (index !== -1 && !Array.isArray(data.data)) {
              Object.assign(this.listReservations[index], data.data);
            }
            this.openModalShow = false;
              this.alertService.showAlert(
                {
                 title: "Success",
                 text: data.message,
                 icon: "success"
                }
                )
            },
            error: (error) => {
                console.log(error);
                 this.actifLoader = false;

            },
            complete: () => {
                 this.actifLoader = false

            }
          }
        )
      }
    })
  }

  refuserReservation(id:number){
    this.alertService.showConfirmation("Refuser la reservation", "Voulez-vous refuser cette reservation?").then((result) => {
      if (result.isConfirmed) {
        this.actifLoader = true
        this.reservationService.getData<ResponData<Reservation>>(`reservations/refuse/${id}`).subscribe(
          {
            next: (data) => {
              // this.sweeAlertFunction(data.message, 'success');
            const index = this.listReservations.findIndex(res => res.id === id);
            if (index !== -1 && !Array.isArray(data.data)) {
              Object.assign(this.listReservations[index], data.data);
            }
            this.openModalShow = false;
              this.alertService.showAlert(
                {
                 title: "Success",
                 text: data.message,
                 icon: "success"
                }
                )
            },
            error: (error) => {
                console.log(error);
                 this.actifLoader = false;

            },
            complete: () => {
                 this.actifLoader = false

            }
          }
        )
      }
    })
  }


}
