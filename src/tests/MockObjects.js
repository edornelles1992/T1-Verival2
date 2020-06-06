export const reservaDataValida = { 
    dataInicio: "2020-10-25", 
    dataFim: "2020-10-27", 
    nome: "Airton", 
    idUsuario: 1, 
    custo: 200, 
    recurso: {
        id: "3",
        nome: "Auditório 32",
        tipo: "espaço",
        tamanho: 90,
        assentos: 120
    },
}

export const reservaDataInvalidaMesmoDia = { 
    dataInicio: "2020-10-10", 
    dataFim: "2020-10-10", 
    nome: "João", 
    idUsuario: 1, 
    custo: 200, 
    recurso: {
        id: "3",
        nome: "Auditório 32",
        tipo: "espaço",
        tamanho: 90,
        assentos: 120
    },
}