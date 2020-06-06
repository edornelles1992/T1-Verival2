
export const calcularCusto = (tipo, custo, valorM2, tamanho, assentos, custoAdicionalAssento) => {
    if (tipo === "movel" || tipo === "mobilia") {
        return custo
    } else { //espaço
        return (valorM2 * tamanho) + (assentos * custoAdicionalAssento)
    }
}

export const calculaCustoTotalColaborador = (colaborador, reservas) => {
    const reservasColaborador = reservas.filter(reserva => reserva.idUsuario === colaborador.id)
    if (!!reservasColaborador && reservasColaborador.length > 0) {
        const custoTotal = reservasColaborador.reduce((total, res) => total += res.custo, 0);
        return custoTotal
    } else {
        return 0
    }
}

export const calculaCustoTotalRecurso = (recurso, reservas) => {
    const recursosReserva = reservas.filter(reserva => reserva.recurso.id === recurso.id)
    if (!!recursosReserva && recursosReserva.length > 0) {
        const custoTotal = recursosReserva.reduce((total, res) => total += res.custo, 0);
        return custoTotal
    } else {
        return 0
    }
}

export const calculaCustoTotalDiarias = (reserva) => {
    if (!reserva.dataInicio || !reserva.dataFim) return 0;
    
    const dias = (new Date(reserva.dataFim) - (new Date(reserva.dataInicio))) / (60 * 60 * 24 * 1000);
    if (dias < 1) {
        return reserva.custo
    } else {
        return reserva.custo * (dias + 1)
    }
}