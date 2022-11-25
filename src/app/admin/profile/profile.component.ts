import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User} from '../../auth/interfaces/interfaces';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DashBoardService } from '../services/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[MessageService]
})
export class ProfileComponent implements OnInit {
  get loggedUser(){
    return this.authservice.loggedUser;
  }

  address:string = ''
  birthdate!:string
  loading: boolean = false;
  user!:User

  constructor(private router: Router,
    private authservice:AuthService,
    private messageService: MessageService,
    private dashboardService: DashBoardService,
    private fb:FormBuilder,) { }

  ngOnInit(): void {

    this.user = this.loggedUser
    this.address = this.user.address!
    this.birthdate = this.user.birthdate!
    
  }


  updateUser(){

    this.user.address = this.address;

    this.user.birthdate = this.formatDate(this.birthdate);
    this.loading = true;
    this.dashboardService.updateUser(this.user).subscribe(
      resp=>{
        this.user = resp.data;

          if (resp.status == "ok") {
            this.messageService.add({ severity: 'success', summary: 'Update Message', detail: resp.message, life: 3000 });
           
          }
          else{
            this.messageService.add({ severity: 'warn', summary: 'Update Message', detail: resp.message, life: 3000 });

          }

          this.loading = false;


      }
    );
  }


  
  formatDate(date:any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
}


}
