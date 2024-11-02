import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/ItemCarrinho';
import { CarrinhoService } from '../../services/carrinho.service';
import { VendaService } from '../../services/venda.service';
import { CapitalizeService } from '../../services/Utils/captalize-strings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormaPagamento, getDescricaoFormaPagamento, getFormaPagamentoPorDescricao } from '../../models/FormaPagamento';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  nomeCiente: string = "";
  

  constructor(
    private carrinhoService: CarrinhoService,
    private vendasService: VendaService,
    private capitalizeService: CapitalizeService
  ) {}

  ngOnInit(): void {
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
    const descricao = this.formaPagamentoSelecionada;
    const formaPagamentoSelecionadaEnum = getFormaPagamentoPorDescricao(descricao);
    this.nomeCiente = this.capitalizeService.capitalize(this.nomeCiente);
    console.log(this.nomeCiente)

  }
  


}
