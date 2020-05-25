import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AkComponent } from './ak/ak.component';
import { PatientComponent } from './patient/patient.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from './route.guard';
import { FacilityComponent } from './facility/facility.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { ProviderComponent } from './provider/provider.component';
import { ExpensiveComponent } from './expensive/expensive.component';
import { ReportsComponent } from './reports/reports.component';
import { CombinepatComponent } from './combinepat/combinepat.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dash', component: DashboardComponent, canActivate: [RouteGuard] },
  { path: 'ak', component: AkComponent },
  {
    path: 'patient', component: PatientComponent,
    canActivate: [RouteGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'facility', component: FacilityComponent, canActivate: [RouteGuard] },
  { path: 'insurance', component: InsuranceComponent, canActivate: [RouteGuard] },
  { path: 'provider', component: ProviderComponent, canActivate: [RouteGuard] },
  { path: 'expensive', component: ExpensiveComponent, canActivate: [RouteGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [RouteGuard] },
  { path: 'cpat', component: CombinepatComponent,  canActivate: [RouteGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
