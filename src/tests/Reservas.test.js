import Reservas from '../views/Reservas'
import { getReservas } from '../services/index'
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

test('Deve instanciar a Page Reservas',() => {
    let reservas = new Reservas();
    expect(reservas).toBeDefined();
})

test('Deve carregar a lista de reservas', async () => {
    let reservas = await getReservas()
    expect(reservas).toBeDefined();
})

test('Deve carregar os recursos apartir da tela de reservas', async () => {
    const wrapper = shallow(<Reservas/>);
    expect(await wrapper.instance().carregaRecursos()).toBe(true)
})

test('Deve carregar as reservas apartir da tela de reservas', async () => {
    const wrapper = shallow(<Reservas/>);
    expect(await wrapper.instance().carregaReservas()).toBe(true)
})