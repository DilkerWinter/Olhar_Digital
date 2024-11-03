import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemCarrinho } from '../../../../models/ItemCarrinho';
import { Produto } from '../../../../models/Produto';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { DeletarItemCarrinhoComponent } from '../deletar-item-carrinho/deletar-item-carrinho.component';
import { CarrinhoService } from '../../../../services/carrinho.service';

@Component({
  selector: 'app-produtos-carrinho-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './produtos-carrinho-card.component.html',
  styleUrls: ['./produtos-carrinho-card.component.css']
})
export class ProdutosCarrinhoCardComponent implements OnInit {

  @Input() item!: ItemCarrinho; 
  @Output() itemRemovido = new EventEmitter<void>(); 
  
  faTrash = faTrash;
  produto!: Produto; 
  quantidade!: number; 

  produtoNome: string = "";
  produtoValor: string = ""; 
  produtoDesc: string = "";
  produtoUrlImg: string = "";
  produtoValorTotal: string = ""; 

  constructor(private dialog: MatDialog, private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.produto = this.item.produto;
    this.quantidade = this.item.quantidade;

    this.produtoNome = this.produto.getNome(); 
    this.produtoValor = this.formatarValor(this.produto.getValor()); 
    this.produtoDesc = this.produto.getDescricao();
    this.produtoUrlImg = this.produto.getUrlImage();


    this.calculaValorTotal(); 
  }

  calculaValorTotal() {
    const valorTotal = this.quantidade * parseFloat(this.produtoValor.replace(',', '.'));
    this.produtoValorTotal = this.formatarValor(valorTotal); 
  }

  private formatarValor(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
  }

  removerItem() {
    const dialogRef = this.dialog.open(DeletarItemCarrinhoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletarItemCarrinho();
      }
    });
  }

  private deletarItemCarrinho() {
    this.carrinhoService.removerProduto(this.item)
    this.itemRemovido.emit();
  }
}
