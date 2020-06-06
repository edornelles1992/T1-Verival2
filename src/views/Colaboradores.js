import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { getColaboradores, getReservas } from '../services/index';
import { showNotification } from '../components/Notification';
import { calculaCustoTotalColaborador } from '../utils/CustoUtility';
import toMoneyConversion from '../utils/NumberUtility';

export default class Colaboradores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colaboradores: [],
            reservas: []
        };
    }

    componentDidMount() {
        this.carregaColaboradores()
        this.carregaReservas();
    }

    async carregaColaboradores() {
        let colaboradores = await getColaboradores()
        if (!!colaboradores) {
            this.setState({ colaboradores });
            return true;
        }
        else {
            showNotification("Não foi possivel buscar os colaboradores.", "Erro!", "danger")
            return false;
        }
    }

    async carregaReservas() {
        let reservas = await getReservas()
        if (!!reservas) {
            this.setState({ reservas });
            return true;
        }
        else {
            showNotification("Não foi possivel buscar as reservas.", "Erro!", "danger")
            return false;
        }
    }

    render() {
        return (
            <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{ marginTop: '50px' }}>
                <Grid item xs={12} >
                    <Typography variant="h4" >
                        Colaboradores
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                <Paper>
                    <Grid container justify="space-between" alignItems="center"  direction="row">
                    <Typography variant="h6" style={{ marginLeft: 50}}>
                            Colaborador
                    </Typography>
                        <Typography variant="h6" style={{ marginLeft: 50}}>
                            Matrícula
                    </Typography>
                        <Typography variant="h6" style={{ marginLeft: 50}} >
                            E-mail
                    </Typography>
                        <Typography variant="h6"  style={{ marginRight: 10}}>
                            Custo Total
                    </Typography>
                    </Grid>
                    
                        <List dense style={{ width: '800px' }}>
                            {this.state.colaboradores.map((colaborador) => {
                                return (
                                    <ListItem key={colaborador} button>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={'imagem'}
                                                src={'/static/images/avatar/'}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText style={{ textAlign: 'left' }} primary={colaborador.nome} />
                                        <ListItemText style={{ textAlign: 'center' }} primary={colaborador.matricula} />
                                        <ListItemText style={{ textAlign: 'right' }} primary={colaborador.email} />
                                        <ListItemText style={{ textAlign: 'right' }} primary={"R$ " + toMoneyConversion(calculaCustoTotalColaborador(colaborador, this.state.reservas))} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        );
    }


}







