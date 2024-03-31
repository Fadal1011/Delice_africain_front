import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Login } from '../../interfaces/login';
import { UserLogin } from '../../interfaces/user-login';
import { environment } from 'src/environments/environment.development';
import { User } from '../../interfaces/user';
import { ResponData } from 'src/app/shared/interfaces/respon-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formAuthenticate: FormGroup = new FormGroup({});
  formRegister: FormGroup = new FormGroup({});
  sendMailUser:FormGroup = new FormGroup({});
  actifLoader: boolean = false;
  sendMailLoader: boolean = false;
  erroLogin: string = '';
  showModal:boolean = false;
  registerVisible: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: LoginService,
     private router: Router,
      private sweetAlert: AlertService) {
   this.formAuthenticate = this.fb.group({
     email: ["", [Validators.required]],
     password: ["", [Validators.required]]
   })

   this.formRegister = this.fb.group({
    nom: ["", [Validators.required]],
    numero_telephone: ["", [Validators.required]],
    email: ["", [Validators.required,Validators.email]],
    password: ["", [Validators.required]],
    password_confirmation: ["", [Validators.required]],
   })

 }

 resetForm() {
  this.formRegister.reset({
    nom: "",
    numero_telephone: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
}

  get email() {
    return this.formAuthenticate.get('email');
  }

  get password() {
    return this.formAuthenticate.get('password');
  }


  login() {
    this.actifLoader = true;
    this.authService.postData<Login, UserLogin>("login", this.formAuthenticate.value).subscribe({
      next: (value) => {
        if (value) {
          localStorage.setItem(environment.appName + "_token", value.token);
          localStorage.setItem(environment.appName + '_user', JSON.stringify(value.user));
          this.router.navigateByUrl('home');
          this.actifLoader = false;
          this.erroLogin = "";
        }
        else {
          this.actifLoader = false;
          // this.erroLogin = value.;
        }
      },
      error: (err) => {
        this.actifLoader = false;
        this.erroLogin = err.message;
        console.log(err);

      }
    });

  }

  register(){
    this.actifLoader = true;
    this.authService.postData<User,ResponData<User>>("register",this.formRegister.value).subscribe(
      {
        next: (data) => {
          this.resetForm()
          this.registerVisible = false;
          this.sweetAlert.showAlert(
            {
             title: "Success",
             text: data.message,
             icon: "success"
            }
           )
        },
        error: (err) => {
          this.actifLoader = false;
          this.sweetAlert.showAlert(
            {
             title: "Error",
             text: "erreur lors de l'inscription",
             icon: "error"
            }
           )
        },
        complete: () => {
          this.actifLoader = false;
        }
      }
    )
  }


  toggleRegister(){
    this.registerVisible = !this.registerVisible;
  }

}
