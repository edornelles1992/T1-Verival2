import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from '../components/Title';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {getRecursos} from '../services/index'
import toMoneyConversion from '../utils/NumberUtility';

export default class Recursos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recursos: undefined
        };
    }
    async componentDidMount() {
        let recursos = await getRecursos()
        this.setState({ recursos });
    }


    render() {
        return (
            <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{marginTop: '10px'}}>
                <Grid item xs={12} >
                    <Title text="Recursos"> </Title>
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
                            {!!this.state.recursos && this.state.recursos.itens.map((recurso) => (
                                <TableRow key={recurso.id}>
                                    <TableCell align="center">{recurso.nome}</TableCell>
                                    <TableCell align="center">{recurso.tipo}</TableCell>
                                    <TableCell align="center">{recurso.tamanho}</TableCell>
                                    <TableCell align="center">{recurso.assentos}</TableCell>
                                    <TableCell align="center">{"R$ " + toMoneyConversion(recurso.custo)}</TableCell>
                                    
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>               
            </Grid>
      );
    }


}







