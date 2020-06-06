import CadastroReservas from '../views/CadastroReservas'

test('Deve instanciar a Page Cadastro Reserva',() => {
    let cadastroReservas = new CadastroReservas();
    expect(cadastroReservas).toBeDefined();
})


