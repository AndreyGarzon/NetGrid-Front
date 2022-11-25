import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[MessageService]

})
export class RegisterComponent{

  loading:boolean = false;

  myForm: FormGroup =this.fb.group({
    name:['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,) { }

    ngOnInit(): void {
      
    }

  register (){
    this.loading = true;
      this.authService.register(this.myForm.value).subscribe(
        resp=>{
          if (resp.status == "ok") {
            this.messageService.add({ severity: 'success', summary: 'Sign up Message', detail: resp.message, life: 3000 });
            this.router.navigateByUrl('/auth/login');
          }
          else{
            this.messageService.add({ severity: 'warn', summary: 'Sign up Message', detail: resp.message, life: 3000 });

          }

          this.loading = false;
        }
      )
  }
}
