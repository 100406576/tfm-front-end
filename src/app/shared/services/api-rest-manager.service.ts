import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { Operation } from '../models/operation.model';
import { BarChartData } from '../models/bar-char-data.model';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRestManagerService {
  private baseurl = 'http://localhost:3000/';

  constructor(private http: HttpClient,
    private auth: AuthService
  ) { }

  getUserProfile() {
    const username = this.auth.getCurrentUsername();
    const url = `${this.baseurl}users/${username}`;
    return this.http.get<User>(url).pipe(
      map((response: any) => {
        const user: User = {
          name: response.name,
          lastName: response.lastName,
          username: response.username,
          password: response.password,
          email: response.email,
          phoneNumber: response.phoneNumber,
          dni: response.dni,
          gender: response.gender
        };
        return user;
      })
    );
  }

  register(user: User) {
    const url = `${this.baseurl}users`;
    const body = user;
    return this.http.post(url, body, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }

  login(credentials: { username: string, password: string }) {
    const url = `${this.baseurl}users/login?username=${credentials.username}&password=${credentials.password}`;
    return this.http.get(url, { observe: 'response' });
  }

  updateUser(user: User) {
    const username = this.auth.getCurrentUsername();
    const url = `${this.baseurl}users/${username}`;
    return this.http.put(url, user, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }

  deleteUser() {
    const username = this.auth.getCurrentUsername();
    const url = `${this.baseurl}users/${username}`;
    return this.http.delete(url, { observe: 'response' });
  }

  getUserProperties(): Observable<Property[]> {
    const url = `${this.baseurl}properties`;
    return this.http.get<Property[]>(url);
  }

  getProperty(property_id: string): Observable<Property> {
    const url = `${this.baseurl}properties/${property_id}`;
    return this.http.get<Property>(url);
  }

  createProperty(property: Property) {
    const url = `${this.baseurl}properties`;
    return this.http.post(url, property, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }

  updateProperty(property_id: string, property: Property) {
    const url = `${this.baseurl}properties/${property_id}`;
    return this.http.put(url, property, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }

  deleteProperty(property_id: string) {
    const url = `${this.baseurl}properties/${property_id}`;
    return this.http.delete(url, { observe: 'response' });
  }

  getPropertyOperations(property_id: string): Observable<Operation[]> {
    const url = `${this.baseurl}operations/property/${property_id}`;
    return this.http.get<Operation[]>(url);
  }

  createOperation(operation: Operation) {
    const url = `${this.baseurl}operations`;
    return this.http.post(url, operation, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }

  updateOperation(operation_id: string, operation: Operation) {
    const url = `${this.baseurl}operations/${operation_id}`;
    return this.http.put(url, operation, { observe: 'response', headers: { 'Content-Type': 'application/json' } });
  }

  deleteOperation(operation_id: string) {
    const url = `${this.baseurl}operations/${operation_id}`;
    return this.http.delete(url, { observe: 'response' });
  }

  createBalance(property_id: string, dateRange: any, timeInterval: number): Observable<BarChartData> {
    const url = `${this.baseurl}balances`;
    const body = {
      property_id,
      dateRange,
      timeInterval
    };
    return this.http.post<BarChartData>(url, body);
  }

  uploadDocument(formData: FormData) {
    const url = `${this.baseurl}documents`;
    return this.http.post(url, formData, { observe: 'response' });
  }

  readDocumentsOfUser(): Observable<Document[]> {
    const url = `${this.baseurl}documents`;
    return this.http.get<Document[]>(url);
  }

  readDocument(documentId: string): Observable<HttpResponse<Blob>> {
    const url = `${this.baseurl}documents/${documentId}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  deleteDocument(documentId: string) {
    const url = `${this.baseurl}documents/${documentId}`;
    return this.http.delete(url, { observe: 'response' });
  }

  deleteDocumentsOfUser() {
    const url = `${this.baseurl}documents`;
    return this.http.delete(url, { observe: 'response' });
  }
}
