import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../models/Venda';
import { VendaCardComponent } from './components/venda-card/venda-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendas',
  standalone: true,
  imports: [VendaCardComponent, CommonModule],
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  vendas: Venda[] = [];
  valorTotal: number = 0;
  valorTotalAnual: number = 0;
  valorTotalMensal: number = 0; 
  valorTotalPrefix: string = "R$";
  valorTotalVendas: string = "";
  valorTotalVendasMensal: string = "";
  valorTotalVendasAnual: string = "";
  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.buscaTodasVendas();
  }

  private buscaTodasVendas(): void {
    this.vendaService.getVendas().subscribe(
      (vendas: Venda[]) => {
        this.vendas = vendas; 
        this.preencherResumoVendas();
      },
      error => {
        console.error('Error fetching vendas:', error);
      }
    );
  }

  private preencherResumoVendas(): void {
    this.valorTotal = this.vendas.reduce((total, venda) => total + venda.getValorTotal(), 0);
    
    this.valorTotalVendas = `${this.valorTotalPrefix} ${this.valorTotal.toFixed(2).replace('.', ',')}` || "R$ 0,00";

    this.calcularTotalMensal();
    this.calcularTotalAnual();
  }

  private calcularTotalMensal(): void {
    const mesAtual = new Date().getMonth(); 
    const anoAtual = new Date().getFullYear();

    this.valorTotalMensal = this.vendas
      .filter(venda => {
        const dataVenda = new Date(venda.getDataVenda()); 
        return dataVenda.getMonth() === mesAtual && dataVenda.getFullYear() === anoAtual;
      })
      .reduce((total, venda) => total + venda.getValorTotal(), 0);

    this.valorTotalVendasMensal = `${this.valorTotalPrefix} ${this.valorTotalMensal.toFixed(2).replace('.', ',')}` || "R$ 0,00";
  }

  private calcularTotalAnual(): void {
    const anoAtual = new Date().getFullYear();
  
    this.valorTotalAnual = this.vendas
      .filter(venda => {
        const dataVenda = new Date(venda.getDataVenda());
        return dataVenda.getFullYear() === anoAtual;
      })
      .reduce((total, venda) => total + venda.getValorTotal(), 0);
  
    this.valorTotalVendasAnual = `${this.valorTotalPrefix} ${this.valorTotalAnual.toFixed(2).replace('.', ',')}` || "R$ 0,00";
  }
  
}
