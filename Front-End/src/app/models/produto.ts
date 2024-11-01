export class Produto {
    
    private id: number | null; // Permitir que id seja null
    private nome: string;
    private descricao: string;
    private valor: number;
    private quantidade: number;
    private urlImagem: string;

    constructor(
        id: number | null, // Permitir que id seja null no construtor
        nome: string,
        descricao: string,
        valor: number,
        quantidade: number,
        urlImage: string,
    ) {
        this.id = id; // Armazenar o id que pode ser null
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor; 
        this.quantidade = quantidade;
        this.urlImagem = urlImage; 
    }

    getId(): number | null { // Permitir que getId retorne null
        return this.id;
    }

    setId(value: number | null) { // Método para definir o id, permitindo null
        this.id = value;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(value: string) {
        if (!value || value.length === 0) {
            throw new Error('Nome não pode ser vazio.');
        }
        this.nome = value;
    }

    getDescricao(): string {
        return this.descricao;
    }

    setDescricao(value: string) {
        if (!value || value.length === 0) {
            throw new Error('Descrição não pode ser vazia.');
        }
        this.descricao = value;
    }

    getValor(): number {
        return this.valor;
    }

    setValor(value: number) {
        if (value < 0) {
            throw new Error('Valor não pode ser negativo.');
        }
        this.valor = value;
    }

    getQuantidade(): number {
        return this.quantidade;
    }

    setQuantidade(value: number) {
        if (value < 0) {
            throw new Error('Quantidade não pode ser negativa.');
        }
        this.quantidade = value;
    }

    getUrlImage(): string {
        return this.urlImagem;
    }

    setUrlImage(value: string) {
        this.urlImagem = value;
    }
}
