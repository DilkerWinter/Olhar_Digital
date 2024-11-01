import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { error } from 'console';

@Injectable({
  providedIn: 'root',  
})
export class ProdutoService {
  private apiUrl = "http://localhost:8080/api/produto";

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  salvaOuEditaProduto(produto: Produto): Observable<Produto> {
    const urlEditar = `${this.apiUrl}/${produto.getId()}`;

    if (produto.getId() !== null) {
      return this.http.put<Produto>(urlEditar, produto);
    } else {
      return this.http.post<Produto>(this.apiUrl, produto);
    }
  }

  deletarProduto(idProduto: number): Observable<Produto>{
    const urlDeletar = `${this.apiUrl}/${idProduto}`;
    
    return this.http.delete<Produto>(urlDeletar);
  }
}
