import { Component, OnInit } from '@angular/core';
import { TypeService } from '../../services/type.service';
import { Type } from '../../interfaces/type';
import { ResponData } from 'src/app/shared/interfaces/respon-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit{

  listType:Type[] = []
  actifEdit:boolean = false
  AjouterType!:FormGroup
  actifLoader: boolean = false;
  EnregistreList:Type[] = [];
  recupId!:number
  TextForm:string =" Ajouter un Type"
  constructor(private typeService:TypeService,private fb:FormBuilder,private alertService:AlertService,){
    this.AjouterType = this.fb.group({
      "nom":["",[Validators.required]]
    })
  }


  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.typeService.getData<ResponData<Type[]>>("type").subscribe(
      (data)=>{
        this.listType = data.data
        this.EnregistreList = this.listType
      }
    )
  }


  resetForm(): void {
    this.AjouterType.reset();
  }


  addADish(){
    this.actifLoader = true
    this.typeService.postData<Type,ResponData<Type>>("type", this.AjouterType.value).subscribe(
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
          this.listType.unshift(data.data);
          this.EnregistreList = this.listType
          this.resetForm();
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


  actifEditFunction(id:number,nom:string){
    this.actifEdit = true;

      this.recupId = id
      this.AjouterType.patchValue({
        nom:nom,
      })
    this.TextForm ="Modifier le type"

  }

  annuleUpdate(){
    this.actifEdit = false;
    this.resetForm()
    this.TextForm =" Ajouter un Type"
  }

  updatePlat(){
    this.actifLoader = true
    this.typeService.putData<Type,ResponData<Type>>(`type/${this.recupId}`,this.AjouterType.value).subscribe(
      {
        next: (data) => {
        const index = this.listType.findIndex(type => type.id === this.recupId);
        if (index !== -1 && !Array.isArray(data.data)) {
          Object.assign(this.listType[index], data.data);
        }
        this.EnregistreList = this.listType
          this.resetForm();
          this.annuleUpdate();
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
    this.alertService.showConfirmation("Suppression", "Voulez vous supprimer cette type de plat").then((result) => {
      if (result.isConfirmed) {
    this.actifLoader = true
        this.typeService.deleteData<number,ResponData<Type>>("type",id).subscribe(
          {
            next: (data) => {
              this.actifLoader = false;
              this.listType = this.listType.filter(type => type.id !== id);
              this.EnregistreList = this.listType
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

  filterData(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search(searchTerm);
  }

  search(searchTerm: string = '') {
     this.listType = this.EnregistreList
        this.listType = this.listType.filter(type => type.nom.toLowerCase().includes(searchTerm.toLowerCase()));
  }





}
