import CadastroReservas from '../views/CadastroReservas'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import React from 'react';
import { reservaDataValida } from './MockObjects'
import { reservaDataInvalidaMesmoDia } from './MockObjects'

configure({adapter: new Adapter()});

test('Deve instanciar a Page Cadastro Reserva',() => {
    let cadastroReservas = new CadastroReservas();
    expect(cadastroReservas).toBeDefined();
})

test('Deve validar uma reserva com data válida', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()

    instance.state.reserva = reservaDataValida
    instance.validarReserva()
    expect(instance.validarReserva()).toBe(true);
})

test('Deve validar uma reserva com data inválida', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataInvalidaMesmoDia
    instance.validarReserva()
    expect(instance.validarReserva()).toBe(false);
})

