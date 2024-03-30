import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  constructor(private router: Router){}

  isActive(link: string): boolean {
    return this.router.isActive(link, true);
  }

}



