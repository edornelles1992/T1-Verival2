import Colaboradores from '../views/Colaboradores'
import { getColaboradores } from '../services/index'

test('Deve instanciar a Page Colaboradores',() => {
    let colaboradores = new Colaboradores();
    expect(colaboradores).toBeDefined();
})

test('Deve carregar lista de colaboradores', async () => {
    let colaboradores = await getColaboradores()
    expect(colaboradores).toBeDefined();
})
