import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getRecursos, getReservas} from '../services/index'
import toMoneyConversion from '../utils/NumberUtility';
import { Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { showNotification } from '../components/Notification';
import { calcularCusto, calculaCustoTotalRecurso } from '../utils/CustoUtility';

export default class Recursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recursos: undefined,
            tipo: "todos",
            valorM2: undefined,
            custoAdicionalAssento: undefined,
            reservas: []
        };
    }

    componentDidMount() {
       this.carregaRecursos()
       this.carregaReservas();
    }

    async carregaRecursos(){
        let recursos = await getRecursos()
        if (!!recursos)
           this.setState({ recursos, valorM2: recursos.valorM2, custoAdicionalAssento: recursos.custoAdicionalAssento });
        else 
          showNotification("Não foi possivel buscar os recursos.", "Erro!", "danger")
    }

    async carregaReservas() {
        let reservas = await getReservas()
        if (!!reservas)
            this.setState({ reservas });
        else
            showNotification("Não foi possivel buscar as reservas.", "Erro!", "danger")
    }

    render() {

        const handleChange = (event) => {            
            this.setState({ tipo: event.target.value });
          };

        return (
            <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{marginTop: '50px'}}>
                <Grid item xs={12} >
                    <Typography variant="h4" >
                        Recursos
                    </Typography>
                </Grid>


                <Grid item xs={12}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.tipo}
                        onChange={handleChange}
                        style={{width: '250px'}}
                    >
                        <MenuItem value={"todos"}>Todos</MenuItem>
                        <MenuItem value={"espaço"}>Espaços físicos</MenuItem>
                        <MenuItem value={"movel"}>Equipamentos móveis</MenuItem>
                        <MenuItem value={"mobilia"}>Itens de mobília</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} style={{width: '800px'}}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nome</TableCell>
                                        <TableCell align="center">Tipo</TableCell>
                                        <TableCell align="center">Tamanho (m2)</TableCell>
                                        <TableCell align="center">Assentos</TableCell>
                                        <TableCell align="center">Custo Unidade</TableCell>
                                        <TableCell align="center">Custo Total</TableCell>
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                                {!!this.state.recursos && this.state.recursos.itens.map(rec => {
                                    return this.state.tipo === "todos" || this.state.tipo === rec.tipo ?
                                    <TableRow key={rec.id}>
                                        <TableCell align="center">{rec.nome}</TableCell>
                                        <TableCell align="center">{rec.tipo}</TableCell>
                                        <TableCell align="center">{rec.tamanho}</TableCell>
                                        <TableCell align="center">{rec.assentos}</TableCell>
                                        <TableCell align="center">{"R$ " + toMoneyConversion(calcularCusto(rec.tipo, rec.custo, 
                                            this.state.valorM2, rec.tamanho, rec.assentos, this.state.custoAdicionalAssento))}</TableCell>
                                       <TableCell align="center">{"R$ " + calculaCustoTotalRecurso(rec, this.state.reservas)}</TableCell>
                                    </TableRow>
                                    :
                                    null
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>               
            </Grid>
      );
    }


}







