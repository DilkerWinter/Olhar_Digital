export enum FormaPagamento {
    CREDITO = "Crédito",
    DEBITO = "Débito",
    PIX = "Pix",
    BOLETO = "Boleto",
    DINHEIRO = "Dinheiro"
}

export function getDescricaoFormaPagamento(forma: FormaPagamento): string {
    return forma;
}

export function getFormaPagamentoPorDescricao(descricao: string ): FormaPagamento | null {
    if (descricao === null) return null;

    for (const [key, value] of Object.entries(FormaPagamento)) {
        if (value === descricao) {
            return key as FormaPagamento;
        }
    }
    return null; 
}