import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venda } from '../models/Venda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormaPagamento } from '../models/FormaPagamento';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = "http://localhost:8080/api/venda";

  constructor(private http: HttpClient) {}

  getVendas(): Observable<Venda[]> {
    const urlTodasVendas: string = `${this.apiUrl}/buscaTodas`;
    return this.http.get<any[]>(urlTodasVendas).pipe(
      map(response => response.map(data => Venda.fromJSON(data))) 
    );
  }

  deletarVendas(id: number): Observable<void> {
    const urlDeletarVenda: string = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(urlDeletarVenda);
  }

  getFormaPagamento(): Observable<FormaPagamento[]> {
    const urlFormaPagamento: string = `${this.apiUrl}/buscaFormasPagamento`;
    return this.http.get<string[]>(urlFormaPagamento).pipe(
        map(response => response.map(item => this.mapToFormaPagamento(item)))
    );
}

private mapToFormaPagamento(item: string): FormaPagamento {
    switch (item) {
        case 'Crédito':
            return FormaPagamento.CREDITO;
        case 'Débito':
            return FormaPagamento.DEBITO;
        case 'Pix':
            return FormaPagamento.PIX;
        case 'Boleto':
            return FormaPagamento.BOLETO;
        case 'Dinheiro':
            return FormaPagamento.DINHEIRO;
        default:
            throw new Error(`Forma de pagamento desconhecida: ${item}`);
    }
}
}
