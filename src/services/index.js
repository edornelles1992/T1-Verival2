import axios from "axios";


export const getColaboradores = () => {
  return axios.get('http://localhost:3000/colaboradores')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return null;
  })
};

export const getRecursos = () => {
  return axios.get('http://localhost:3000/recursos')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return null;
  })
};

export const getReservas = () => {
  return axios.get('http://localhost:3000/reservas')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return null;
  })
};

export const postCadastroReservas = (reserva) => {
  return axios.post('http://localhost:3000/reservas', {
    dataInicio: reserva.dataInicio,
    dataFim: reserva.dataFim,
    nome: reserva.nome,
    idUsuario: reserva.idUsuario,
    custo: reserva.custo,
    recurso: reserva.recurso 
  })
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error
  })
};

export const deleteCadastroReservas = (reserva) => {
  return axios.delete('http://localhost:3000/reservas/'+ reserva.id)
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    return error
  })
};