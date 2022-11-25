import { Component,OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items!: MenuItem[];
  ngOnInit() {



      this.items = [

        {
            label:'Characters',
            icon:'pi pi-fw pi-user',
            routerLink:['/admin/dashboard']
        },
        
        {
          label:'Profile',
          icon:'pi pi-fw pi-user-edit',
          routerLink:['/admin/profile']
        }
    ];
    

}    
    constructor(private router: Router,private authService:AuthService) { }
    logout(){
        this.router.navigateByUrl('/auth/login');
        this.authService.logout()
          .subscribe();
      }
  


}
