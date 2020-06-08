const { getColaboradores, getRecursos, getReservas, postCadastroReservas, deleteCadastroReservas } = require('../services/index');

test("Compara o primeiro colaborador do load inicial", async () => {
    const received = await getColaboradores();
    const expected = {
        "email": "denis@gmail.com",
        "id": "1",
        "matricula": "164930254",
        "nome": "Denis Manoel"
    };

    expect(received[0]).toStrictEqual(expected);
});

test("Compara o primeiro item de recurso do load inicial", async () => {
    const received = await getRecursos();

    const expected = {
        id: '1',
        nome: 'Sala 201',
        tipo: 'espaço',
        tamanho: 25,
        assentos: 40
    };

    expect(received.itens[0]).toStrictEqual(expected);
});

test("Compara a primeira reserva do load inicial", async () => {
    const received = await getReservas();

    const expected = {
        dataInicio: '2020-06-06',
        dataFim: '2020-06-08',
        nome: 'Denis Manoel',
        idUsuario: '1',
        custo: 2340,
        recurso: {
            id: '3',
            nome: 'Auditório 32',
            tipo: 'espaço',
            tamanho: 90,
            assentos: 120
        },
        id: 1
    };

    expect(received[0]).toStrictEqual(expected);
});

test("Inserção de reserva, compara o recurso adicionado", async () => {
    const received = await postCadastroReservas({
        dataInicio: "2020-01-01",
        dataFim: "2020-01-07",
        nome: "Denis Manoel",
        idUsuario: "1",
        custo: 2340,
        recurso: {
            "id": "3",
            "nome": "Auditório 32",
            "tipo": "espaço",
            "tamanho": 90,
            "assentos": 120
        },
    });

    const expected = {
        "id": "3",
        "nome": "Auditório 32",
        "tipo": "espaço",
        "tamanho": 90,
        "assentos": 120
    }

    expect(received.recurso).toStrictEqual(expected);
    await deleteCadastroReservas(received)
}, 1000);