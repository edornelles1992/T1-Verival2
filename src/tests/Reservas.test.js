import Reservas from '../views/Reservas'
import { getReservas } from '../services/index'

test('Deve instanciar a Page Reservas',() => {
    let reservas = new Reservas();
    expect(reservas).toBeDefined();
})

test('Deve carregar a lista de reservas', async () => {
    let reservas = await getReservas()
    expect(reservas).toBeDefined();
})
