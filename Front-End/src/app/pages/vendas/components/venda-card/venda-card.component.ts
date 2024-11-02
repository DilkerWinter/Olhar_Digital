import { Component, Input, OnInit } from '@angular/core';
import { Venda } from '../../../../models/Venda';
import { Produto } from '../../../../models/Produto';
import { CommonModule } from '@angular/common';
import { ProdutoVendaCardComponent } from "../produto-venda-card/produto-venda-card.component";
import { CapitalizeService } from '../../../../services/Utils/captalize-strings.service';

@Component({
  selector: 'app-venda-card',
  standalone: true,
  imports: [CommonModule, ProdutoVendaCardComponent],
  templateUrl: './venda-card.component.html',
  styleUrls: ['./venda-card.component.css']
})
export class VendaCardComponent implements OnInit {
  @Input() venda!: Venda;

  constructor(private capitalizeService: CapitalizeService){}

  valorTotalPrefix: string = "R$";
  nomeCliente: string = "";
  vendaData: string = "";
  valorTotalVenda: string = "";
  formaPagamento: string = "Cartão"; 

  mostrarProdutos: boolean = false;

  produtos: Produto[] = []; 
  quantidades: number[] = [];

  ngOnInit(): void {
    this.preencherCard();
  }

  preencherCard() {
    if (this.venda) {
      this.nomeCliente = this.capitalizeService.capitalize(this.venda.getNomeCliente()) || "Cliente não disponível"; 
      this.vendaData = this.formatarData(this.venda.getDataVenda()) || "Data não disponível"; 
      this.valorTotalVenda = `${this.valorTotalPrefix} ${this.venda.getValorTotal()?.toFixed(2).replace('.', ',')}` || "R$ 0,00";
      this.formaPagamento = this.capitalizeService.capitalize(this.venda.getFormaPagamento() || "Cartão");

      this.produtos = this.venda.getProdutos(); 
      this.quantidades = this.venda.getQuantidadeProduto();
    }
  }

  formatarData(data: string | Date): string {
    if (!data) return '';
    
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0'); 
    const mes = String(date.getMonth() + 1).padStart(2, '0'); 
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`; 
  }

  toggleMostrarProdutos() {
    this.mostrarProdutos = !this.mostrarProdutos;
  }
}
