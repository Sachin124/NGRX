import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {} from "./customer/customer.module"

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "customers",loadChildren:"./customer/customer.module#CustomerModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
