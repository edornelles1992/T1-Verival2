import CadastroReservas from '../views/CadastroReservas'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import React from 'react';
import { postCadastroReservas, deleteCadastroReservas } from '../services/index'
import { reservaDataValida } from './MockObjects'
import { reservaDataInvalidaMesmoDia, 
         reservaDataInvalidaMobilia, 
         reservaDataConflitoMesmoItem,
         reservaMesmaDataItemDiferente,
         reservaMesmaDataItemDiferente1
       } 
from './MockObjects'

configure({adapter: new Adapter()});

test('Deve instanciar a Page Cadastro Reserva',() => {
    let cadastroReservas = new CadastroReservas();
    expect(cadastroReservas).toBeDefined();
})

test('Deve reservar item com data valida', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataValida
    expect(instance.validarReserva()).toBe(true);
})

test('Não deve reservar itens por menos de 1 dia', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataInvalidaMesmoDia
    expect(instance.validarReserva()).toBe(false);
})

test('Não deve reservar mobilia por menos de 4 dias', () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    instance.state.reserva = reservaDataInvalidaMobilia
    expect(instance.validarReserva()).toBe(false);
})

test('Não deve reservar mesmo item com conflito de datas', async () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    let reserva = await postCadastroReservas(reservaDataConflitoMesmoItem)
    instance.state.reserva = reserva
    expect(await instance.cadastrarReserva()).toBe(false);
    await deleteCadastroReservas(reserva)
})

test('Deve reservar itens diferentes na mesma data', async () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()
    let reserva = await postCadastroReservas(reservaMesmaDataItemDiferente)
    instance.state.reserva = reservaMesmaDataItemDiferente1
    let reserva1 = await instance.cadastrarReserva()
    expect(reserva1).toBeDefined();
    await deleteCadastroReservas(reserva)
    await deleteCadastroReservas(reserva1)
})

