import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { getRecursos, getColaboradores, postCadastroReservas } from '../services/index'
import { Typography, MenuItem, Select, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

export default class Recursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recursos: undefined,
            colaboradores: [],
            reserva: 
                {
                  dataInicio: "",
                  dataFim: "",
                  nome: "",
                  idUsuario: undefined,
                  custo: undefined,
                  recurso: {}
            },
        };
    }
    async componentDidMount() {
        let recursos = await getRecursos()
        this.setState({ recursos });

        let colaboradores = await getColaboradores()
        this.setState({ colaboradores });
    }

    handleClickColaborador(colab) {
        this.setState(prevState => ({reserva: {...prevState.reserva, nome: colab.nome, idUsuario: colab.id }}))
    }

    handleClickRecurso(rec) {
        this.setState(prevState => ({reserva: {...prevState.reserva, recurso: rec, custo: rec.custo}}))
    }

    handleChangeDataInicial(e) {
        const value = (e.target.value).toString();
        this.setState(prevState => ({reserva: {...prevState.reserva, dataInicio: value}}))
    }

    handleChangeDataFinal(e) {
        const value = (e.target.value).toString();
        this.setState(prevState => ({reserva: {...prevState.reserva, dataFim: value}}))
    }

    async postReserva() {
        await postCadastroReservas(this.state.reserva)
        this.props.history.push("/reservas")
    }
    render() {
        return (
            <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{ marginTop: '10px' }}>
                <Grid item>
                    <Typography variant="h4" >
                        Cadastro de Reservas
                    </Typography>
                </Grid>
                <Grid item style={{ width: '800px', justifyContent: "space-between", display: "flex" }}>
                    <div>
                        <InputLabel id="demo-simple-select-outlined-label">Colaborador</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            style={{width: "300px"}}
                        >
                            {this.state.colaboradores.map((colab) => {
                                return (
                                    <MenuItem onClick={()=>this.handleClickColaborador(colab)} value={colab}>{colab.nome}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                    <TextField
                        id="datetime-local"
                        label="Data inicial da reserva"
                        type="datetime-local"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => this.handleChangeDataInicial(e)}
                    />
                </Grid>
                <Grid item style={{ width: '800px', justifyContent: "space-between", display: "flex" }}>
                    <div>
                        <InputLabel id="demo-simple-select-outlined-label">Recurso</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            style={{width: "300px"}}
                        >
                            {!!this.state.recursos && this.state.recursos.itens.map((rec) => (
                                <MenuItem onClick={()=>this.handleClickRecurso(rec)} value={rec}>{rec.nome}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <TextField
                        id="datetime-local"
                        label="Data final da reserva"
                        type="datetime-local"
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
                        onClick={()=>this.postReserva()}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        );
    }


}







