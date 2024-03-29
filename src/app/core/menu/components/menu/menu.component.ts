import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu';
import { Plat } from 'src/app/core/plat/interfaces/plat';
import { MenuService } from '../../services/menu.service';
import { ResponData } from 'src/app/shared/interfaces/respon-data';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PlatService } from 'src/app/core/plat/services/plat.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  allMenus:Menu[] = []
  openModalAdd: boolean = false;
  isEdit: boolean = false;
  actifLoader: boolean = false;
  ListPlats:Plat[] = [];
  recupId!: number;
  selected = ['1'];
  // AjouterMenu:FormGroup;

  constructor(
    private datePipe:DatePipe,
    private menuService:MenuService,
    private platService:PlatService,
    private fb:FormBuilder,
    private alertService:AlertService,
  ){}
  ngOnInit() {
    this.getData();
    this.getAllPlat()
  }

  dateControl = new FormControl('', [Validators.required]);

  AjouterMenu = this.fb.group({
    nom: ['', [Validators.required]],
    date: this.dateControl,
    plats: [[] as string[], [Validators.required]],
  });



  resetForm(): void {
    this.AjouterMenu.reset();
  }

  openModalFunc(){
    this.openModalAdd = !this.openModalAdd
    this.resetForm();
  }


  getData(){
    this.menuService.getData<ResponData<Menu[]>>("menu").subscribe(
      (data)=>{
        this.allMenus = data.data
      }
    )
  }

  getAllPlat(){
    this.platService.getData<ResponData<Plat[]>>("plat").subscribe(
      (data)=>{
        this.ListPlats = data.data
      }
    )
  }

  formatSelectedDate(selectedDate: string | null): string {
    if (!selectedDate) {
      return '';
    }
    return this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';
  }


   ajouterMenu(): void {
    this.actifLoader =true
    const formattedDate = this.formatSelectedDate(this.dateControl.value);
    this.AjouterMenu.patchValue({ date: formattedDate });
    console.log(this.AjouterMenu.value);

    this.menuService.postData<any,ResponData<Menu>>('menu',this.AjouterMenu.value).
    subscribe({
      next: (data) => {
        this.alertService.showAlert(
         {
          title: "Success",
          text: data.message,
          icon: "success"
         }
        )
        this.allMenus.unshift(data.data);
        this.resetForm();
        this.openModalAdd = false;
      },
      error: (error) => {
        this.actifLoader =false
      },
      complete: () => {
        this.actifLoader =false
      }
    })
  }


  deleteMenu(id:number){
    this.alertService.showConfirmation("Suppression", "Voulez vous supprimer cette Menu").then((result) => {
      if (result.isConfirmed) {
    this.actifLoader = true
        this.platService.deleteData<number,ResponData<Menu>>("menu",id).subscribe(
          {
            next: (data) => {
              this.actifLoader = false;
              this.allMenus = this.allMenus.filter(plat => plat.id !== id);
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

  remplirForm(id: number): void {
    const menu = this.allMenus.find(menu => menu.id === id);

    if (menu) {
      const platsIds = menu.plats.map(plat => plat.id.toString());
      this.selected = platsIds
      this.AjouterMenu.patchValue({
        nom: menu.nom,
        date: menu.date,
        plats: platsIds
      });
      this.recupId = menu.id;
      this.isEdit = true;
      this.openModalAdd = true;
    } else {
      // Gérer le cas où le menu n'est pas trouvé
      // this.sweeAlertFunction('Menu introuvable', 'error');
    }
  }


  updateMenu(){
    this.actifLoader =true
    const formattedDate = this.formatSelectedDate(this.dateControl.value);
    this.AjouterMenu.patchValue({ date: formattedDate });
    this.AjouterMenu.value.plats = this.selected
    console.log(this.AjouterMenu.value);

    this.platService.putData<any,ResponData<Menu>>(`menu/${this.recupId}`,this.AjouterMenu.value).subscribe(
      {
        next: (data) => {
          // this.sweeAlertFunction(data.message, 'success');
        const index = this.allMenus.findIndex(menu => menu.id === this.recupId);
        if (index !== -1 && !Array.isArray(data.data)) {
          Object.assign(this.allMenus[index], data.data);
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

}
