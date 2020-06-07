import Recursos from '../views/Recursos'
import { getRecursos } from '../services/index'
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

test('Deve instanciar a Page Recursos', () => {
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

test('Deve carregar as reservas apartir da tela de recursos', async () => {
    const wrapper = shallow(<Recursos/>);
    expect(await wrapper.instance().carregaReservas()).toBe(true)
})

test('Deve trocar o filtro em tela para todos', () => {
    const wrapper = shallow(<Recursos/>);
    let instance = wrapper.instance()
    instance.handleChangeSelect("todos")
    expect(instance.state.tipo).toBe("todos");
})

test('Deve trocar o filtro em tela para espaço', () => {
    const wrapper = shallow(<Recursos/>);
    let instance = wrapper.instance()
    instance.handleChangeSelect("espaço")
    expect(instance.state.tipo).toBe("espaço");
})

test('Deve trocar o filtro em tela para movel', () => {
    const wrapper = shallow(<Recursos/>);
    let instance = wrapper.instance()
    instance.handleChangeSelect("movel")
    expect(instance.state.tipo).toBe("movel");
})

test('Deve trocar o filtro em tela para mobilia', () => {
    const wrapper = shallow(<Recursos/>);
    let instance = wrapper.instance()
    instance.handleChangeSelect("mobilia")
    expect(instance.state.tipo).toBe("mobilia");
})