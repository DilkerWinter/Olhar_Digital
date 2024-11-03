import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Venda } from '../../../../models/Venda';
import { Produto } from '../../../../models/Produto';
import { CommonModule } from '@angular/common';
import { ProdutoVendaCardComponent } from "../produto-venda-card/produto-venda-card.component";
import { CapitalizeService } from '../../../../services/Utils/captalize-strings.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { DeletarConfirmarVendaComponent } from './deletar-confirmar-venda/deletar-confirmar-venda.component';
import { VendaService } from '../../../../services/venda.service';

@Component({
  selector: 'app-venda-card',
  standalone: true,
  imports: [CommonModule, ProdutoVendaCardComponent, FontAwesomeModule],
  templateUrl: './venda-card.component.html',
  styleUrls: ['./venda-card.component.css']
})
export class VendaCardComponent implements OnInit {
  @Input() venda!: Venda;

  faTrash = faTrash;

  @Output() vendaDeletada = new EventEmitter<void>();

  constructor(private capitalizeService: CapitalizeService, private dialog: MatDialog, private vendaService: VendaService) {}

  valorTotalPrefix: string = "R$";
  nomeCliente: string = "";
  vendaData: string = "";
  valorTotalVenda: string = "";
  formaPagamento: string = "Cartão"; 

  mostrarProdutos: boolean = false;

  produtos: Produto[] = []; 
  quantidades: number[] = [];

  ngOnInit(): void {
    this.populateCard();
  }

  populateCard() {
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

  deletarVenda(id: number | null): void {
    if (id === null) {
      console.warn('ID for deletion is null');
      return;
    }
  
    const dialogRef = this.dialog.open(DeletarConfirmarVendaComponent);
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vendaService.deletarVendas(id).subscribe({
          next: () => {
            this.vendaDeletada.emit(); 
          },
          error: (err) => {
            console.error('Erro ao deletar venda:', err);
          }
        });
      }
    });
  }
  
}
