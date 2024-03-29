import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent {

  isSideBarVisible = true;
  profilLink = false;
  // userConnecte!:User
  departementActif:string ="";
  chargementEnCours: boolean = false;

  constructor(private router: Router){}
  ngOnInit(): void {
    // this.getUser();
  }


  // chargerPage(): void {
  //   this.chargementEnCours = true;
  //   const departementActifId = this.departementActif; // Remplacez ceci par la manière dont vous récupérez l'ID du département actif
  //   this.router.navigate([`departement/${departementActifId}/utilisateur`]).then(() => {
  //     this.chargementEnCours = false;
  //   });
  // }



  toggleSideBar(){
    this.isSideBarVisible = !this.isSideBarVisible;
  }
  onProfilLink(){
    this.profilLink = !this.profilLink;
  }

  // getUser(){
  //   if(this.authservice.getUser()){
  //       this.userConnecte = this.authservice.getUser()!;
  //       this.departementActif = this.userConnecte.departement!.id.toString()
  //   }
  // }


  isActive(link: string): boolean {
    return this.router.isActive(link, true);
  }


}
