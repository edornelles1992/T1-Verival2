import Reservas from '../views/Reservas'
import { postCadastroReservas, getReservas } from '../services/index'
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { reservaComDataPassada, reservaComDataEmAndamento } from './MockObjects';

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

test('Deve carregar as reservas filtradas por data', () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    instance.state.dataInicialSelecionada = "2020-06-10"
    instance.state.dataFinalSelecionada = "2020-06-16"
    expect(instance.filtrarReservas()).toBe(true);
})

test('Deve dar erro ao tentar filtrar sem dataInicial', () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    instance.state.dataInicialSelecionada = undefined
    instance.state.dataFinalSelecionada = "2020-06-16"
    expect(instance.filtrarReservas()).toBeFalsy();
})

test('Deve dar erro ao tentar filtrar sem dataFinal', () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    instance.state.dataInicialSelecionada = "2020-06-16"
    instance.state.dataFinalSelecionada = undefined
    expect(instance.filtrarReservas()).toBeFalsy();
})

test('Deve dar erro ao tentar filtrar sem nenhuma data', () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    instance.state.dataInicialSelecionada = undefined
    instance.state.dataFinalSelecionada = undefined
    expect(instance.filtrarReservas()).toBeFalsy();
})

test('Deve dar erro ao tentar filtrar com data final maior que a inicial', () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    instance.state.dataInicialSelecionada = "2020-06-16"
    instance.state.dataFinalSelecionada = "2020-06-10"
    expect(instance.filtrarReservas()).toBeFalsy();
})

test('Deve Limpar os filtros de pesquisa', () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    instance.limparCampos()
    expect(instance.state.dataInicialSelecionada).toBe('dd/mm/aaaa');
    expect(instance.state.dataFinalSelecionada).toBe('dd/mm/aaaa');
})

test('Deve recarregar a lista completa de reservas ao limpar os campos', () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    instance.limparCampos()
    expect(instance.state.reservasFiltradas).toBe(instance.state.reservas);
})

test('Deve dar erro ao tentar excluir uma reserva que já passou a data reservada.', async () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    expect(await instance.handleDelete(reservaComDataPassada)).toBeFalsy()
})

test('Deve dar erro ao tentar excluir uma reserva que a data está em andamento.', async () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    expect(await instance.handleDelete(reservaComDataEmAndamento)).toBeFalsy()
})

/*
test('Deve excluir uma reserva válida.', async () => {
    const wrapper = shallow(<Reservas/>);
    let instance = wrapper.instance()
    postCadastroReservas()
    expect(await instance.handleDelete(reservaDataValidaParaExcluir)).toBeFalsy()
})
*/