import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private apiUrl = "http://localhost:8080/api/venda";


  constructor(private http: HttpClient ) {} 
}
