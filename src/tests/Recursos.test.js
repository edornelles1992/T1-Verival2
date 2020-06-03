import Recursos from '../views/Recursos'
import { getRecursos } from '../services/index'

test('Deve instanciar a Page Recursos',() => {
    let recursos = new Recursos();
    expect(recursos).toBeDefined();
})

test('Deve carregar a lista de recursos', async () => {
    let recursos = await getRecursos()
    expect(recursos).toBeDefined();
})
