import { Produto } from "./Produto";

  export class ItemCarrinho {
    constructor(
      public produto: Produto,
      public quantidade: number
    ) {}
  }
  