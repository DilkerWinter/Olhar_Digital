import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root',  
})
export class ProdutoService {
  private apiUrl = "http://localhost:8080/api/produto";

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }


  
}
