import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {getRecursos} from '../services/index'
import toMoneyConversion from '../utils/NumberUtility';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class Recursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recursos: undefined,
            tipo: "todos"
        };
    }

    

    async componentDidMount() {
        let recursos = await getRecursos()
        this.setState({ recursos });
    }

    render() {

        const handleChange = (event) => {            
            this.setState({ tipo: event.target.value });
          };

        return (
            <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{marginTop: '10px'}}>
                <Grid item xs={12} >
                    <Typography variant="h4" >
                        {this.props.text}
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
                                        <TableCell align="center">Custo (R$)</TableCell>
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                                {!!this.state.recursos && this.state.recursos.itens.map(recurso => {
                                    return this.state.tipo === "todos" || this.state.tipo === recurso.tipo ?
                                    <TableRow key={recurso.id}>
                                        <TableCell align="center">{recurso.nome}</TableCell>
                                        <TableCell align="center">{recurso.tipo}</TableCell>
                                        <TableCell align="center">{recurso.tamanho}</TableCell>
                                        <TableCell align="center">{recurso.assentos}</TableCell>
                                        <TableCell align="center">{"R$ " + toMoneyConversion(recurso.custo)}</TableCell>
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







