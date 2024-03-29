import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  reservationForm!: FormGroup;
  heures: string[] = [];
  nombresPersonnes: number[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      nombre_personnes: ['', Validators.required],
      plats: this.formBuilder.array([
        this.createPlatFormGroup("", ""), // Exemple avec des valeurs initiales
      ]),
      date_reservation: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      heure_reservation: ['', Validators.required],
      numero_telephone: ['', Validators.required]
    });
    this.genererHoraires();
    this.genererNombresPersonnes()
  }

  createPlatFormGroup(id: any, quantite: any): FormGroup {
    return this.formBuilder.group({
      id: [id, Validators.required],
      quantite: [quantite, Validators.required]
    });
  }

  get plats() {
    return this.reservationForm.get('plats') as FormArray;
  }

  ajouterPlat() {
    const newPlat = this.createPlatFormGroup(null, null); // Nouveau plat sans valeurs initiales
    this.plats.push(newPlat);
  }


  supprimerPlat(index: number) {
    this.plats.removeAt(index);
  }

  genererHoraires() {
    const debut = 18 * 60; // Heure de début en minutes (18:00)
    const fin = 22 * 60 + 45; // Heure de fin en minutes (22:45)
    const intervalle = 15; // Intervalle en minutes

    for (let minutes = debut; minutes <= fin; minutes += intervalle) {
      const heure = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const heureFormattee = `${heure.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      this.heures.push(heureFormattee);
    }
  }

  genererNombresPersonnes() {
    for (let i = 1; i <= 10; i++) {
      this.nombresPersonnes.push(i);
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      // Soumettre le formulaire ici
      console.log(this.reservationForm.value);
    } else {
      // Afficher des messages d'erreur si le formulaire est invalide
      console.log("Le formulaire n'est pas valide !");
    }
  }

}
