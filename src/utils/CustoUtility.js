export const calcularCusto = (tipo, custo, valorM2, tamanho, assentos, custoAdicionalAssento) => {
    if (tipo === "movel" || tipo === "mobilia") {
        return custo
    } else { //espaço
        return (valorM2 * tamanho) + (assentos * custoAdicionalAssento)
    }
}