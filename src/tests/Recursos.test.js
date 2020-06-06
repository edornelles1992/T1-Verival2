import Recursos from '../views/Recursos'
import { getRecursos } from '../services/index'
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

test('Deve instanciar a Page Recursos',() => {
    let recursos = new Recursos();
    expect(recursos).toBeDefined();
})

test('Deve carregar a lista de recursos', async () => {
    let recursos = await getRecursos()
    expect(recursos).toBeDefined();
})

test('Deve carregar os recursos apartir da tela de recursos', async () => {
    const wrapper = shallow(<Recursos/>);
    expect(await wrapper.instance().carregaRecursos()).toBe(true)
})