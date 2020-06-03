import axios from "axios";


export const getColaboradores = () => {
  return axios.get('http://localhost:3000/colaboradores')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })
};

export const getRecursos = () => {
  return axios.get('http://localhost:3000/recursos')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })
};

export const getReservas = () => {
  return axios.get('http://localhost:3000/reservas')
  .then(function (response) {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
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
    console.log(response)
    return response
  })
  .catch(function (error) {
    console.log(error);
    return error
  })
};

export const deleteCadastroReservas = (reserva) => {
  return axios.delete('http://localhost:3000/reservas/'+ reserva.id)
  .then(function (response) {
    console.log(response)
    return response
  })
  .catch(function (error) {
    console.log(error);
    return error
  })
};

/** DEMAIS EXEMPLOS CHAMADAS PRA API MOCK
export const patchIntegrantesDoTime = (aluno, time) => {
  time.integrantes.push(aluno)
  return axios.patch('http://localhost:3000/times/'+ time.id, {
    id: time.id,
    nome: time.nome,
    integrantes: time.integrantes
  })
  .then(function (response) {
    // handle success
    console.log(response)
    return response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    return error
  })
};

export const deleteIntegranteDoTime = (aluno, time) => {
  let index = time.integrantes.findIndex(element => aluno.id === element.id)
  time.integrantes.splice(index, 1);
  return axios.patch('http://localhost:3000/times/'+ time.id, {
    id: time.id,
    nome: time.nome,
    integrantes: time.integrantes
  })
  .then(function (response) {
    // handle success
    console.log(response)
    return response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    return error
  })
};

export const postAlunosInscritos = (lista) => {
    return lista.map((value) => {
      return axios.post('http://localhost:3000/alunosInscritos', {
        id: value.id,
        nome: value.nome,
        curso: value.curso,
        sugestao: value.sugestao
      })
      .then(function (response) {
        // handle success
        console.log(response)
        return response
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return error
      })
    })
};

export const postCadastraTime = (nomeTime) => {
    return axios.post('http://localhost:3000/times', {
      nome: nomeTime,
      integrantes: []
    })
    .then(function (response) {
      // handle success
      console.log(response)
      return response
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      return error
    })
};


export const deleteTimes = (time) => {
  return axios.delete('http://localhost:3000/times/'+ time.id)
  .then(function (response) {
    // handle success
    console.log(response)
    return response
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    return error
  })
};
*/