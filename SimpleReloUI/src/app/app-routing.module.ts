import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SrHomeComponent } from './Components/sr-home/sr-home.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'home',
    component: SrHomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
