import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  myForm: FormGroup =this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  });
  loading:boolean = false;

  constructor(private fb:FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  login(){
    this.loading = true;
    const {email,password} = this.myForm.value;
    this.authService.login(email,password)
      .subscribe(resp=>{  
        if(resp.access_token !== undefined){

          this.authService.getLoggedInUser(resp.access_token)
          .subscribe(user=>{
            this.router.navigateByUrl(`admin/dashboard`);
            // this.loading = false;
          });
        }
        else{
          Swal.fire({
            title: 'Error!',
            text: resp,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#2563EB',
          });
          this.loading = false;
        }

      });


  }
}
