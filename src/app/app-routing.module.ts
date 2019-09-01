import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';
import {AccountComponent} from './account/account.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [{path: '', component: LoginComponent}, 
{path: 'chat', component: ChatComponent},
{path: 'account', component: AccountComponent},
{path: 'dashboard', component: DashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
