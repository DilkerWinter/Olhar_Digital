import { Produto } from "./Produto";

export class Venda {
    private id: number | null; 
    private dataVenda: string;
    private formaPagamento: string;
    private nomeCliente: string;
    private valorTotal: number;
    private produtos: Produto[];
    private quantidadeProduto: number[];

    constructor(
        id: number | null, 
        dataVenda: string,
        formaPagamento: string,
        nomeCliente: string,
        valorTotal: number,
        produtos: Produto[],
        quantidadeProduto: number[] = [], 
    ) {
        this.id = id;
        this.dataVenda = dataVenda;
        this.formaPagamento = formaPagamento;
        this.nomeCliente = nomeCliente;
        this.valorTotal = valorTotal;
        this.produtos = produtos;
        this.quantidadeProduto = quantidadeProduto.length === produtos.length ? quantidadeProduto : Array(produtos.length).fill(1); // Define 1 como padrão se o tamanho não corresponder
    }

    public static fromJSON(json: any): Venda {
        const vendaData = json.venda; 
        const quantidadeProduto: number[] = [];
        const produtos: Produto[] = [];
    
        if (vendaData) {
            if (json.quantidade) {
                for (const [key, value] of Object.entries(json.quantidade)) {
                    const produto = JSON.parse(key.replace(/Produto\(id=(\d+), nome=([^,]+), descricao=([^,]+), quantidade=(\d+), valor=(\d+\.\d+), urlImagem=([^,]+)\)/, 
                    '{"id":$1,"nome":"$2","descricao":"$3","quantidade":$4,"valor":$5,"urlImagem":"$6"}'));
                    produtos.push(new Produto(produto.id, produto.nome, produto.descricao, produto.quantidade, produto.valor, produto.urlImagem));
    
                    if (typeof value === 'number') {
                        quantidadeProduto.push(value);
                    } else {
                        console.warn(`Expected a number for quantity but got: ${value}`);
                        quantidadeProduto.push(1); 
                    }
                }
            }
        } else {
            console.warn('vendaData is undefined');
        }
    
        return new Venda(
            vendaData?.id || 0,
            vendaData?.dataVenda || '', 
            vendaData?.formaPagamento || '', 
            vendaData?.nomeCliente || '', 
            vendaData?.valorTotal || 0, 
            produtos,
            quantidadeProduto
        );
    }

    getId(): number | null {
        return this.id;
    }

    setId(value: number | null) {
        this.id = value;
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
