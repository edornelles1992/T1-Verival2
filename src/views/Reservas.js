import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { deleteCadastroReservas, getReservas, getRecursos } from '../services/index'
import toMoneyConversion from '../utils/NumberUtility';
import { TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import { showNotification } from '../components/Notification';
import { calcularCusto } from '../utils/CustoUtility';

export default class Reservas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservas: [],
      selectedReservaIndex: 0,
      dataInicialSelecionada: undefined,
      dataFinalSelecionada: undefined,
      reservasFiltradas: [],
      valorM2: undefined,
      custoAdicionalAssento: undefined,
      loading: true
    };
  }

  componentDidMount = async () => {
    await this.carregaRecursos()
    await this.carregaReservas();
  };

  async carregaReservas() {
    this.setState({ loading: true })
    let reservas = await getReservas()
    if (!!reservas) {
      this.setState({ reservas, reservasFiltradas: reservas, loading: false });
      return true;
    }
    else {
      showNotification("Não foi possivel buscar as reservas.", "Erro!", "danger")
      return false;
    }
  }

  async carregaRecursos() {
    let recursos = await getRecursos()
    if (!!recursos) {
      this.setState({ valorM2: recursos.valorM2, custoAdicionalAssento: recursos.custoAdicionalAssento });
      return true;
    }
    else {
      showNotification("Não foi possivel buscar os recursos.", "Erro!", "danger")
      return false;
    }
  }

  async handleDelete(reserva) {
    let dataInicio = new Date(reserva.dataInicio)
    let dataFim = new Date(reserva.dataFim)
    let dataHoje = new Date()
    if ((dataFim <= dataHoje) || ((dataFim >= dataHoje) && (dataInicio <= dataHoje))) {
      showNotification("Não é possível excluir reservas passadas ou em andamento", "Erro!", "danger")
      return
    }
    let result = await deleteCadastroReservas(reserva)
    if (result) {
      let reservas = await getReservas()
      this.setState({ reservas });
      this.filtrarReservas()
    }
  }

  handleChangeDataInicial(e) {
    const value = (e.target.value).toString();
    this.setState({ dataInicialSelecionada: value })
  }

  handleChangeDataFinal(e) {
    const value = (e.target.value).toString();
    this.setState({ dataFinalSelecionada: value })
  }

  filtrarReservas = () => {
    if (this.state.dataInicialSelecionada === undefined || this.state.dataFinalSelecionada === undefined) {
      this.setState({ reservasFiltradas: this.state.reservas })
      return false
    }
    if (this.state.dataFinalSelecionada < this.state.dataInicialSelecionada){
      showNotification("Data final menor que Data inicial.", "Erro!", "danger")
      return false
    }
    else {
      let newArray = this.state.reservas.filter(res =>
        res.dataInicio >= this.state.dataInicialSelecionada &&
        res.dataFim <= this.state.dataFinalSelecionada
      )
      this.setState({ reservasFiltradas: newArray })
      return true;
    }
  }

  render() {
    const { reservasFiltradas, loading } = this.state
    return (
      <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{ marginTop: '50px' }}>
        <Grid item xs>
          <Typography variant="h4">
            Reservas
          </Typography>
        </Grid>
        <Grid item xs>
          <Button
            variant="contained"
            component={Link}
            to={'/cadastro-reservas'}
            color="primary"
            style={{ marginBottom: "20px" }}
          >
            Inserir Reserva
          </Button>
        </Grid>
        <Grid item xs>
          <TextField
            id="dateIni"
            label="Data Inicial"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: "20px" }}
            value={this.state.dataInicialSelecionada}
            onChange={(e) => this.handleChangeDataInicial(e)}
          />
          <TextField
            id="dateEnd"
            label="Data Final"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => this.handleChangeDataFinal(e)}
            value={this.state.dataFinalSelecionada}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px", marginTop: "10px" }}
            onClick={() => this.filtrarReservas()}
          >
            Buscar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "20px", marginTop: "10px" }}
            onClick={() => this.setState({ reservasFiltradas: this.state.reservas, dataInicialSelecionada: 'dd/mm/aaaa', dataFinalSelecionada: 'dd/mm/aaaa' })}
          >
            Limpar
          </Button>
        </Grid>
        <Grid item xs style={{ width: '800px' }}>
          {reservasFiltradas.map((reserva, index) => (
            <ExpansionPanel key={index} TransitionProps={{ unmountOnExit: true }} onChange={() => this.setState({ selectedTeamIndex: index })}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"panel" + index + "c-content"}
                id={"panel" + index + "c-header"}
              >
                <Typography variant="h6">{index + 1 + " - Reserva de " + reserva.nome + " - " + reserva.recurso.nome}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid item xs={12}>
                  <Typography>{"Responsável: " + reserva.nome}</Typography>
                  <Typography>{"Data Inicio: " + new Date(reserva.dataInicio).toLocaleDateString('pt-BR', { timeZone: 'UTC', hour12: false })}</Typography>
                  <Typography>{"Data Fim: " + new Date(reserva.dataFim).toLocaleDateString('pt-BR', { timeZone: 'UTC', hour12: false })}</Typography>
                  <Typography>{"Recurso: " + reserva.recurso.nome}</Typography>
                  <Typography>{"Tipo: " + reserva.recurso.tipo}</Typography>
                  <Typography>{"Custo Diário: R$ " + toMoneyConversion(calcularCusto(reserva.recurso.tipo, reserva.recurso.custo,
                    this.state.valorM2, reserva.recurso.tamanho, reserva.recurso.assentos, this.state.custoAdicionalAssento))}</Typography>
                  <Typography>{"Custo Total: R$ " + toMoneyConversion(reserva.custo)}</Typography>
                </Grid>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small" onClick={() => this.handleDelete(reserva)}>Excluir</Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}
        </Grid>
        {(reservasFiltradas.length <= 0 && !loading) &&
          <Typography variant="h5">
            Nenhuma reserva foi encontrada.
          </Typography>}
      </Grid>
    );
  }


}







