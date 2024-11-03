import { Produto } from "./Produto";

export class ItemCarrinho {
  private _produto!: Produto; 
  private _quantidade!: number; 

  constructor(produto: Produto, quantidade: number) {
    this.produto = produto; 
    this.quantidade = quantidade; 
  }

  get produto(): Produto {
    return this._produto;
  }

  set produto(value: Produto) {
    if (!value) {
      throw new Error("O produto não pode ser indefinido.");
    }
    this._produto = value;
  }

  get quantidade(): number {
    return this._quantidade;
  }

  set quantidade(value: number) {
    if (value < 1) { 
      throw new Error("A quantidade deve ser maior que zero.");
    }
    this._quantidade = value;
  }
}
