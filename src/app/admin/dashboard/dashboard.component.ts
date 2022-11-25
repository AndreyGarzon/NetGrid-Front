import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { DashBoardService } from "../services/dashboard.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptCharacter, FavoriteFetch,OptFavorite } from './interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[MessageService]
})
export class DashboardComponent {

 
  get loggedUser(){
    return this.authservice.loggedUser;
  }

  //PrimeNg Table Variables

  characters: OptCharacter[] = [];
  
  character: OptCharacter = {};

  favorite:OptFavorite = {};

  submitted: boolean = false;

  
  loading: boolean = true;
  constructor(private router: Router,
    private authservice:AuthService,
    private messageService: MessageService,
    private dashboardService: DashBoardService,
    private fb:FormBuilder, ) { }

  ngOnInit() {
      this.dashboardService.characters().subscribe(
        resp=>{
            this.characters = resp;
            this.loading = false;
        }
      );
  }


  updateUserForm: FormGroup =this.fb.group({
    first_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
    role_id: ['',[Validators.required]],
    email: ['',[Validators.required]],
  });
  updatePassForm: FormGroup =this.fb.group({
    password: ['',[Validators.required, Validators.minLength(8)]],
  });


  addFavorite(ref_api:string | undefined){

    const favoriteInfo:FavoriteFetch = {
      id_usuario: this.loggedUser.id,
      ref_api:ref_api
    }
    this.loading = true;
    this.dashboardService.addFavorite(favoriteInfo).subscribe(
      resp=>{
          this.favorite = resp.data;

          if (resp.status == "ok") {
            this.messageService.add({ severity: 'success', summary: 'Favorite Message', detail: resp.message, life: 3000 });

          }
          else{
            this.messageService.add({ severity: 'warn', summary: 'Favorite Message', detail: resp.message, life: 3000 });

          }

          this.loading = false;
      }
    );
  }


}
