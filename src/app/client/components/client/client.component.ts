import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  isConnected = false;
  roleUser:string = '';

  constructor(private router: Router ,private loginService:LoginService,private alertService:AlertService){
    this.getUser();
  }

  isActive(link: string): boolean {
    return this.router.isActive(link, true);
  }

  getUser(){
   const user = this.loginService.getUser();
    if(user){
      this.isConnected = true
      this.roleUser = user.role
    }
  }

  logout() {
    this.alertService.showConfirmation("Deconnexion", "Voulez vous vraiment vous déconnecter").then((result) => {
      if (result.isConfirmed) {
        this.loginService.getData<any[]>("logout").subscribe({
          next: (value) => {
              localStorage.clear();
              this.router.navigateByUrl('/auth');
              this.isConnected = false;

          },
          error: (err) => {
            this.alertService.showAlert({
              title: "Erreur",
              text: err.message,
              icon: "warning"
            })

          },
          complete: () => {

          }
        });


      }
    });



  }

}



