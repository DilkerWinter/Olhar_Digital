import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/ItemCarrinho';
import { CarrinhoService } from '../../services/carrinho.service';
import { VendaService } from '../../services/venda.service';
import { CapitalizeService } from '../../services/Utils/captalize-strings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormaPagamento, getDescricaoFormaPagamento, getFormaPagamentoPorDescricao } from '../../models/FormaPagamento';
import { ProdutosCarrinhoCardComponent } from './components/produtos-carrinho-card/produtos-carrinho-card.component';
import { Venda } from '../../models/Venda';
import { response } from 'express';
import { error } from 'console';
import { ErrorDialogComponent } from '../home/components/produto-card/components/editar-produto-dialog-card/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, ProdutosCarrinhoCardComponent],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: ItemCarrinho[] = [];
  
  resumoValorTotal: number = 0;
  resumoValorTotalFormatado: string = '';
  
  formasPagamento: FormaPagamento[] = []; 
  formasPagamentoDescricao: string[] = [];
  formaPagamentoSelecionada: FormaPagamento | null = null;

  nomeCliente: string = "";
  

  constructor(
    private dialog: MatDialog,
    private carrinhoService: CarrinhoService,
    private vendasService: VendaService,
    private capitalizeService: CapitalizeService
  ) {}

  ngOnInit(): void {
    this.itensCarrinho = [];
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.calcularValorTotal();
    this.preencherFormaPagamento();
  }

  calcularValorTotal(): void {
    this.resumoValorTotal = this.itensCarrinho.reduce((total, item) => {
      return total + (item.quantidade * item.produto.getValor());
    }, 0);

    this.resumoValorTotalFormatado = this.formatarValor(this.resumoValorTotal);
  }

  private formatarValor(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
  }

  preencherFormaPagamento(): void {
    this.formasPagamento = Object.values(FormaPagamento); 
    this.formasPagamentoDescricao = this.formasPagamento.map(forma => getDescricaoFormaPagamento(forma)); 
  }

  onFinalizarCompra() {
    if (!this.formaPagamentoSelecionada) {
      this.openErrorDialog('Por favor, selecione uma forma de pagamento.');
      return;
    }
    
    const formaPagamentoSelecionadaEnum = getFormaPagamentoPorDescricao(this.formaPagamentoSelecionada);
    
    if (formaPagamentoSelecionadaEnum === null) {
      this.openErrorDialog('Forma de pagamento inválida.');
      return;
    }
  
    this.nomeCliente = this.capitalizeService.capitalize(this.nomeCliente);
  
    const novaVenda = new Venda(
      null, 
      new Date().toISOString().split('T')[0], 
      formaPagamentoSelecionadaEnum, 
      this.nomeCliente,
      this.resumoValorTotal,
      this.itensCarrinho.map(item => item.produto),
      this.itensCarrinho.map(item => item.quantidade) 
    );
  
    this.vendasService.criarVenda(novaVenda).subscribe(
      response => {
        this.openSucessDialog("Compra finalizada."); 
        this.carrinhoService.limparCarrinho();
        this.ngOnInit();
      },
      error => {
        this.openErrorDialog('Houve um erro ao finalizar a compra. Tente novamente.');
      }
    );
  }
  
  onItemRemovido() {
    this.ngOnInit(); 
  }
  
  openSucessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message },
    });
  }

  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
    });
  }
  

}
