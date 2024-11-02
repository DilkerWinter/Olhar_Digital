import { Produto } from "./Produto";

export class Venda {
    private dataVenda: string;
    private formaPagamento: string;
    private nomeCliente: string;
    private valorTotal: number;
    private produtos: Produto[];
    private quantidadeProduto: number[];

    constructor(
        dataVenda: string,
        formaPagamento: string,
        nomeCliente: string,
        valorTotal: number,
        produtos: Produto[],
        quantidadeProduto: number[] = [], 
    ) {
        this.dataVenda = dataVenda;
        this.formaPagamento = formaPagamento;
        this.nomeCliente = nomeCliente;
        this.valorTotal = valorTotal;
        this.produtos = produtos;
        this.quantidadeProduto = quantidadeProduto.length === produtos.length ? quantidadeProduto : Array(produtos.length).fill(1); // Define 1 como padrão se o tamanho não corresponder
    }

    public getDataVenda(): string {
        return this.dataVenda;
    }

    public setDataVenda(dataVenda: string): void {
        this.dataVenda = dataVenda;
    }

    public getFormaPagamento(): string {
        return this.formaPagamento;
    }

    public setFormaPagamento(formaPagamento: string): void {
        this.formaPagamento = formaPagamento;
    }

    public getNomeCliente(): string {
        return this.nomeCliente;
    }

    public setNomeCliente(nomeCliente: string): void {
        this.nomeCliente = nomeCliente;
    }

    public getValorTotal(): number {
        return this.valorTotal;
    }

    public setValorTotal(valorTotal: number): void {
        this.valorTotal = valorTotal;
    }

    public getProdutos(): Produto[] {
        return this.produtos;
    }

    public setProdutos(produtos: Produto[]): void {
        this.produtos = produtos;
    }

    public getQuantidadeProduto(): number[] {
        return this.quantidadeProduto;
    }

    public setQuantidadeProduto(quantidadeProduto: number[]): void {
        this.quantidadeProduto = quantidadeProduto;
    }
}
