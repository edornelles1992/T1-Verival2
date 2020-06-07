export const reservaDataValida = { 
    dataInicio: "2021-10-25", 
    dataFim: "2021-10-27", 
    nome: "Airton", 
    idUsuario: 14, 
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
    dataInicio: "2021-10-10", 
    dataFim: "2021-10-10", 
    nome: "João", 
    idUsuario: 12, 
    custo: 200, 
    recurso: {
        id: "3",
        nome: "Auditório 32",
        tipo: "espaço",
        tamanho: 90,
        assentos: 120
    },
}

export const reservaDataInvalidaMobilia = { 
    dataInicio: "2021-10-12", 
    dataFim: "2021-10-13", 
    nome: "João", 
    idUsuario: 12, 
    custo: 200, 
    recurso: {
        id: "12",
        nome: "cadeira 2",
        tipo: "mobilia",
        custo: 5
    },
}

export const reservaDataConflitoMesmoItem = { 
    dataInicio: "2020-06-07",
    dataFim: "2020-06-08",
    nome: "João", 
    idUsuario: 12, 
    custo: 200, 
    recurso: {
        id: "3",
        nome: "Auditório 32",
        tipo: "espaço",
        tamanho: 90,
        assentos: 120
    },
}
export const reservaComDataPassada = { 
    dataInicio: "2020-06-01", 
    dataFim: "2020-06-05", 
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

export const reservaComDataEmAndamento = { 
    dataInicio: "2020-06-01", 
    dataFim: "2020-10-12", 
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

export const reservaMesmaDataItemDiferente = { 
    dataInicio: "2020-06-07",
    dataFim: "2020-06-20",
    nome: "João",
    idUsuario: 12,
    custo: 200,
    recurso: {
        id: "8",
        nome: "tablet 1",
        tipo: "movel",
        custo: 10
    },
}

export const reservaDataValidaParaExcluir = { 
    dataInicio: "2020-08-10", 
    dataFim: "2020-08-20", 
    nome: "Airton", 
    idUsuario: 1, 
    custo: 200, 
    id: "excluir",
    recurso: {
        id: "3",
        nome: "Auditório 32",
        tipo: "espaço",
        tamanho: 90,
        assentos: 120
    },
}
