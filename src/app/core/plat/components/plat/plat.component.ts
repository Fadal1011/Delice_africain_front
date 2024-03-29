import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatService } from '../../services/plat.service';
import { ResponData } from 'src/app/shared/interfaces/respon-data';
import { Plat } from '../../interfaces/plat';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TypeService } from 'src/app/core/type/services/type.service';
import { Type } from 'src/app/core/type/interfaces/type';

@Component({
  selector: 'app-plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.css']
})
export class PlatComponent implements OnInit{
  addPlat:FormGroup
  openModalAdd:boolean = false;
  defaultimage:any="../../../assets/plat-de-service.png";
  @ViewChild('fileInput') fileInput!: ElementRef;
  ListPlats:Plat[] = [];
  unPlat!:Plat
  isEdit: boolean = false;
  recupId:number = 0;
  actifLoader: boolean = false;
  listType:Type[] = [];

    // Constructeur de la classe
    constructor(
      private fb: FormBuilder,
      private platService:PlatService,
      private alertService:AlertService,
      private typeService:TypeService
    ) {
      this.addPlat = this.fb.group({
        'nom': ['', [Validators.required]],
        'description': ['', [Validators.required]],
        'prix': ['', [Validators.required]],
        "image": [this.defaultimage, [Validators.required]],
        "type_id": ['', [Validators.required]],
      });
    }
  ngOnInit(){
    this.getData();
    this.AllType()
  }

     // Accesseur pour récupérer le champ image du formulaire
  get image() {
    return this.addPlat.get('image');
  }

  openModalFunc(){
    this.openModalAdd = !this.openModalAdd
    this.resetForm();
  }


    // Méthode pour gérer le changement de fichier
    onFileChange(event: Event) {
      const filesTarget = event.target as HTMLInputElement;
      if (filesTarget.files) {
        const file = filesTarget.files[0];
        if (file) {
          if (file.size > 500000) {
            console.log('La taille de l\'image dépasse 500 Ko');
            return;
          }
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent) => {
            if (e.target) {
              this.image?.setValue(reader.result)
              this.defaultimage = reader.result as string;
              console.log(this.defaultimage);

            }
          };
          reader.readAsDataURL(file);
        }
      }
    }

    openFileInput() {
      this.fileInput.nativeElement.click();
    }

    resetForm(): void {
      this.addPlat.reset();
      this.defaultimage="../../../assets/plat-de-service.png";
      this.isEdit = false;
    }


    addADish(){
      this.actifLoader = true
      this.platService.postData<Plat,ResponData<Plat>>("plat", this.addPlat.value).subscribe(
        {
          next: (data) => {
            this.alertService.showAlert(
             {
              title: "Success",
              text: data.message,
              icon: "success"
             }
            )
            console.log(data);
            this.ListPlats.unshift(data.data);
            this.resetForm();
            this.openModalAdd = false;
          },
          error: (error) => {
            this.actifLoader =false
              console.log(error);
          },
          complete: () => {
            this.actifLoader =false
          }
        }
      )
    }

    getData(){
      this.platService.getData<ResponData<Plat[]>>("plat").subscribe(
        (data)=>{
          this.ListPlats = data.data

        }
      )
    }

    AllType(){
      this.typeService.getData<ResponData<Type[]>>("type").subscribe(
        (data)=>{
          this.listType = data.data
        }
      )
    }

    remplirForm(id:number){
      const plat = this.ListPlats.find(plat => plat.id === id);
      if (plat) {
        this.addPlat.patchValue({
          nom: plat.nom,
          description: plat.description,
          prix: plat.prix,
          image:plat.image,
          type_id: plat.type_id
        });
        this.defaultimage = plat.image,
        this.recupId = plat.id

        this.isEdit = true;
        this.openModalAdd = true;
      } else {
        // this.sweeAlertFunction('plat introuvable', 'error');
      }

    }


    updatePlat(){
      this.actifLoader = true
      this.platService.putData<Plat,ResponData<Plat>>(`plat/${this.recupId}`,this.addPlat.value).subscribe(
        {
          next: (data) => {
            // this.sweeAlertFunction(data.message, 'success');
          const index = this.ListPlats.findIndex(plat => plat.id === this.recupId);
          if (index !== -1 && !Array.isArray(data.data)) {
            Object.assign(this.ListPlats[index], data.data);
          }
            this.resetForm();
            this.openModalAdd = false;
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


    deletePlat(id:number){
      this.alertService.showConfirmation("Suppression", "Voulez vous supprimer cette plat").then((result) => {
        if (result.isConfirmed) {
      this.actifLoader = true
          this.platService.deleteData<number,ResponData<Plat>>("plat",id).subscribe(
            {
              next: (data) => {
                this.actifLoader = false;
                this.ListPlats = this.ListPlats.filter(plat => plat.id !== id);
                this.resetForm();
                this.alertService.showAlert(
                  {
                   title: "Success",
                   text: data.message,
                   icon: "success"
                  }
                  )

              },
              error: (error) => {
                this.actifLoader = false;
                // this.sweeAlertFunction(error.message, 'error');
              },
              complete: () => {
                console.log("La requête HTTP est terminée.");
                this.actifLoader = false;

              }
            }
          )
        }
      })
    }





}
