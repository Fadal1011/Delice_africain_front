import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../interfaces/menu';
import { ResponData } from 'src/app/shared/interfaces/respon-data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  listPlats!:Menu[]
  listPlatsSecours!:Menu[]
  listAllTypes!:any[]
  TypeActive!:string;

  constructor(private menuService:MenuService){}
  ngOnInit(){
    this.getAllType()
    this.getData()
  }

  getData(){
    this.menuService.getData<ResponData<Menu[]>>(`plat`).subscribe({
      next:(data) => {
        this.listPlats = data.data;
        this.listPlatsSecours = [...this.listPlats]; // Copie de sauvegarde
        if (this.listAllTypes && this.listAllTypes.length > 0) {
          this.filterPlatsByType(this.listAllTypes[0].nom);
          this.TypeActive = this.listAllTypes[0].nom
        }
      },
      error:(err) => {
        console.log(err);
      },
      complete: () => {
        console.log("requette terminez...");
      }
    });
  }

  getAllType(){
    this.menuService.getData<ResponData<any[]>>("type").subscribe({
      next:(data) => {
        this.listAllTypes = data.data;
      },
      error:(err) => {
        console.log(err);
      },
      complete:() => {
        console.log("requette terminez...");
      }
    });
  }

  filterPlatsByType(type: string) {
    this.TypeActive = type;
    this.listPlats = [...this.listPlatsSecours]; // Restaurer les données originales
    if (type) {
      this.listPlats = this.listPlats.filter(plat => plat.type === type);
    }
  }
}

