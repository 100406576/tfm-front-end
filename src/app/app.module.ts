import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ApiRestManagerService } from './shared/services/api-rest-manager.service';
import { AuthService } from './shared/services/auth.service';
import { RequestInterceptor, ResponseInterceptor } from './shared/services/interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
import { PropertiesComponent } from './properties/properties.component';
import { ReadPropertyDetailDialogComponent } from './properties/read-property-detail-dialog/read-property-detail-dialog.component';
import { CreateUpdatePropertyDialogComponent } from './properties/create-update-property-dialog/create-update-property-dialog.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeocodingService } from './shared/services/geocoding.service';
import { OperationsComponent } from './operations/operations.component';
import { CreateUpdateOperationDialogComponent } from './operations/create-update-operation-dialog/create-update-operation-dialog.component';
import { BalancesComponent } from './balances/balances.component';
import { BarChartComponent } from './shared/components/bar-chart/bar-chart.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from '../utils/customerAdapter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ConfirmationDialogComponent,
    PropertiesComponent,
    ReadPropertyDetailDialogComponent,
    CreateUpdatePropertyDialogComponent,
    OperationsComponent,
    CreateUpdateOperationDialogComponent,
    BalancesComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    GoogleMapsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    ApiRestManagerService,
    AuthService,
    GeocodingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: {
            parse: {
                dateInput: 'DD/MM/YYYY',
            },
            display: {
                dateInput: 'DD/MM/YYYY',
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            },
        }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
