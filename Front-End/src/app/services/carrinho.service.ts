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
  
    try {
      const parsedCarrinho = JSON.parse(carrinho);
      return parsedCarrinho.map((item: any) => {
        if (!item || !item._produto || typeof item._produto.id === 'undefined') {
          console.error('Item inválido:', item);
          return null; 
        }
        return new ItemCarrinho(
          new Produto(
            item._produto.id,         
            item._produto.nome,       
            item._produto.descricao,  
            item._produto.valor,      
            item._produto.quantidade, 
            item._produto.urlImagem   
          ),
          item._quantidade            
        );
      }).filter((item: any) => item !== null);
    } catch (error) {
      console.error('Erro ao analisar carrinho:', error);
      return [];
    }
  }
  
  
  

  private salvarCarrinho(carrinho: ItemCarrinho[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(carrinho));
  }

  limparCarrinho(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  removerProduto(item: ItemCarrinho): void {
    const carrinho = this.obterCarrinho();
    const index = carrinho.findIndex(cartItem => cartItem.produto.getId() === item.produto.getId());
  
    if (index > -1) {
      carrinho.splice(index, 1);
      this.salvarCarrinho(carrinho);
    }
  }
  
}