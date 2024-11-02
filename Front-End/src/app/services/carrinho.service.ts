import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto';
import { ItemCarrinho } from '../models/ItemCarrinho';

@Injectable({ providedIn: 'root' })

export class CarrinhoService {
  private readonly STORAGE_KEY = 'carrinho';

  constructor() {}

  adicionarProduto(produto: Produto, quantidade: number): void {
    const carrinho = this.obterCarrinho();
    const itemExistente = carrinho.find(item => item.produto.getId() === produto.getId());

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push(new ItemCarrinho(produto, quantidade)); 
    }

    this.salvarCarrinho(carrinho);
  }

  obterCarrinho(): ItemCarrinho[] {
    const carrinho = localStorage.getItem(this.STORAGE_KEY);
    if (!carrinho) return [];
  
    const parsedCarrinho = JSON.parse(carrinho);
    return parsedCarrinho.map((item: any) => 
      new ItemCarrinho(
        new Produto(
          item.produto.id,
          item.produto.nome,
          item.produto.descricao,
          item.produto.valor,
          item.produto.quantidade,
          item.produto.urlImagem
        ),
        item.quantidade
      )
    );
  }
  
  

  private salvarCarrinho(carrinho: ItemCarrinho[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carrinho));
  }

  limparCarrinho(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
