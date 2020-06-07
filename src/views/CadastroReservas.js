import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { getRecursos, getColaboradores, postCadastroReservas, getReservas } from '../services/index'
import { Typography, MenuItem, Select, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { showNotification } from '../components/Notification';
import toMoneyConversion from '../utils/NumberUtility';
import { calcularCusto, calculaCustoTotalDiarias } from '../utils/CustoUtility';
import { formatDate } from '../utils/DateUtility';

export default class CadastroReservas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recursos: undefined,
            colaboradores: [],
            valorM2: undefined,
            custoAdicionalAssento: undefined,
            reserva:
            {
                dataInicio: "",
                dataFim: "",
                nome: "",
                idUsuario: undefined,
                custo: undefined,
                recurso: {},
            },
        };
    }

    async componentDidMount() {
        let recursos = await getRecursos()
        this.setState({ recursos, valorM2: recursos.valorM2, custoAdicionalAssento: recursos.custoAdicionalAssento });

        let colaboradores = await getColaboradores()
        this.setState({ colaboradores });
    }

    handleClickColaborador(colab) {
        this.setState(prevState => ({ reserva: { ...prevState.reserva, nome: colab.nome, idUsuario: colab.id } }))
    }

    handleClickRecurso(rec) {
        const custo = calcularCusto(rec.tipo, rec.custo, this.state.valorM2, rec.tamanho, rec.assentos, this.state.custoAdicionalAssento)
        this.setState(prevState => ({ reserva: { ...prevState.reserva, recurso: rec, custo: custo } }))
    }

    handleChangeDataInicial(e) {
        const value = (e.target.value).toString();
        this.setState(prevState => ({ reserva: { ...prevState.reserva, dataInicio: value } }))
    }

    handleChangeDataFinal(e) {
        const value = (e.target.value).toString();
        this.setState(prevState => ({ reserva: { ...prevState.reserva, dataFim: value } }))
    }

    validarReserva() {
        if (!this.state.reserva.nome) {
            showNotification("É necessário selecionar um colaborador", "Erro!", "danger")
            return false
        }
        if (!this.state.reserva.custo) {
            showNotification("É necessário selecionar um recurso", "Erro!", "danger")
            return false
        }
        if (this.state.reserva.dataFim < this.state.reserva.dataInicio) {
            showNotification("Data Final não pode ser menor que inicial", "Erro!", "danger")
            return false
        }
        if (!this.state.reserva.dataFim || !this.state.reserva.dataInicio) {
            showNotification("Selecione um período de reserva", "Erro!", "danger")
            return false
        }

        if (new Date(this.state.reserva.dataInicio) < new Date(formatDate(new Date()))) {
            showNotification("Data de Inicio menor que data Atual", "Erro!", "danger")
            return false
        }
        
        if (this.state.reserva.recurso.tipo === 'mobilia') {
            let tempoMinimo = new Date(this.state.reserva.dataInicio);
            tempoMinimo.setDate(tempoMinimo.getDate() + 3);
            if (new Date(this.state.reserva.dataFim) <= tempoMinimo) {
                showNotification("Mobília tem um período mínimo de reserva de 4 dias", "Erro!", "danger")
                return false
            }
        }
        if (this.state.reserva.dataInicio === this.state.reserva.dataFim) {
            showNotification("Período mínimo para reservas é de 1 dia", "Erro!", "danger")
            return false
        }

        return true
    }

    async cadastrarReserva() {
        if (!this.validarReserva()) {
            return false
        }
        //Filtra reservas que possuem conflito de datas
        let todasReservas = await getReservas()
        let newArray = todasReservas.filter(res =>
            ((res.dataInicio >= this.state.reserva.dataInicio &&
                res.dataFim <= this.state.reserva.dataFim) ||
                (res.dataInicio == this.state.reserva.dataFim ||
                    res.dataFim == this.state.reserva.dataInicio)) &&
            (res.recurso.id === this.state.reserva.recurso.id)
        )
        if (newArray.length > 0) {
            showNotification("Conflito de horário para reserva deste recurso", "Erro!", "danger")
            return false
        } else {
            this.state.reserva.custo = calculaCustoTotalDiarias(this.state.reserva)
            await postCadastroReservas(this.state.reserva)
            if(this.props.history) {
                this.props.history.push("/reservas")
            }
            showNotification("Reserva cadastrada com sucesso", "Sucesso!", "success")
            return true
        }
    }

    render() {
        return (
            <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{ marginTop: '50px' }}>
                <Grid item>
                    <Typography variant="h4" >
                        Cadastro de Reservas
                    </Typography>
                </Grid>
                <Grid item style={{ width: '800px', justifyContent: "space-between", display: "flex" }}>
                    <div>
                        <InputLabel id="input-colab">Colaborador</InputLabel>
                        <Select
                            labelId="input-colab-label"
                            id="input-colab-select-filled"
                            style={{ width: "300px" }}
                        >
                            {this.state.colaboradores.map((colab) => {
                                return (
                                    <MenuItem onClick={() => this.handleClickColaborador(colab)} value={colab}>{colab.nome}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                    <TextField
                        id="dateIni"
                        label="Data inicial da reserva"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => this.handleChangeDataInicial(e)}
                    />
                </Grid>
                <Grid item style={{ width: '800px', justifyContent: "space-between", display: "flex" }}>
                    <div>
                        <InputLabel id="input-recurso">Recurso</InputLabel>
                        <Select
                            labelId="select-recurso-label"
                            id="select-recurso"
                            style={{ width: "300px" }}
                        >
                            {!!this.state.recursos && this.state.recursos.itens.map((rec) => (
                                <MenuItem onClick={() => this.handleClickRecurso(rec)} value={rec}>{rec.nome}</MenuItem>
                            ))}
                        </Select>
                        {this.state.reserva.custo &&
                        <>
                        <Typography variant="h6"  style={{ marginTop: '30px' }}>
                            {"Custo Diário: R$" + toMoneyConversion(this.state.reserva.custo)}
                        </Typography>
                        <Typography variant="h6"  style={{ marginTop: '10px' }}>
                            {"Custo Total: R$" + toMoneyConversion(calculaCustoTotalDiarias(this.state.reserva))}
                        </Typography>
                        </>}
                    </div>
                    <TextField
                        id="dateFim"
                        label="Data final da reserva"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => this.handleChangeDataFinal(e)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.cadastrarReserva()}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        );
    }


}







