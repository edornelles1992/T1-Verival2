import Colaboradores from '../views/Colaboradores'
import { getColaboradores } from '../services/index'
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

test('Deve instanciar a Page Colaboradores',() => {
    let colaboradores = new Colaboradores();
    expect(colaboradores).toBeDefined();
})

test('Deve carregar lista de colaboradores', async () => {
    let colaboradores = await getColaboradores()
    expect(colaboradores).toBeDefined();
})

test('Deve carregar os colaboradores apartir da tela de colaboradores', async () => {
    const wrapper = shallow(<Colaboradores/>);
    expect(await wrapper.instance().carregaColaboradores()).toBe(true)
})
