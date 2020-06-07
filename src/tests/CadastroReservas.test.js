import CadastroReservas from '../views/CadastroReservas'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import React from 'react';
import { reservaDataValida } from './MockObjects'
import { reservaDataInvalidaMesmoDia, 
         reservaDataInvalidaMobilia, 
         reservaDataConflitoMesmoItem,
         reservaMesmaDataItemDiferente
       } 
from './MockObjects'

configure({adapter: new Adapter()});

test('Deve instanciar a Page Cadastro Reserva',() => {
    let cadastroReservas = new CadastroReservas();
    expect(cadastroReservas).toBeDefined();
})

test('Reserva com data válida', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataValida
    expect(instance.validarReserva()).toBe(true);
})

test('Reserva com data inválida, menos de 1 dia', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataInvalidaMesmoDia
    expect(instance.validarReserva()).toBe(false);
})

test('Reserva de mobilia invalido, menos de 4 dias', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataInvalidaMobilia
    expect(instance.validarReserva()).toBe(false);
})

test('Reserva invalida, conflito de datas ao reservar mesmo item', async () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataConflitoMesmoItem
    expect(await instance.cadastrarReserva()).toBe(false);
})


test('Reserva valida, itens diferentes na mesma data', async () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaMesmaDataItemDiferente
    expect(await instance.cadastrarReserva()).toBe(true);
})
