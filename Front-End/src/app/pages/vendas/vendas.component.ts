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

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.buscaTodasVendas(); 
  }

  private buscaTodasVendas(): void {
    this.vendaService.getVendas().subscribe(
      (vendas: Venda[]) => {
        this.vendas = vendas; 
      },
      error => {
        console.error('Error fetching vendas:', error);
      }
    );
  }
}
