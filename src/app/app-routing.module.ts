import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PropertiesComponent } from './properties/properties.component';
import { OperationsComponent } from './operations/operations.component';
import { BalancesComponent } from './balances/balances.component';
import { DocumentsComponent } from './documents/documents.component';
import { TaxReturnComponent } from './tax-return/tax-return.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthGuard]},
  { path: 'operations', component: OperationsComponent, canActivate: [AuthGuard]},
  { path: 'balances', component: BalancesComponent, canActivate: [AuthGuard]},
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
  { path: 'tax-return', component: TaxReturnComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo:'/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
