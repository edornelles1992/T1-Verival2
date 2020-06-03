import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {getColaboradores} from '../services/index'

export default class Colaboradores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colaboradores: [],
        };
    }
    async componentDidMount() {
        let colaboradores = await getColaboradores()
        this.setState({ colaboradores });
    }

    render() {
        return (
            <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{marginTop: '50px'}}>
                <Grid item xs={12} >
                    <Typography variant="h4" >
                        Colaboradores
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <List dense style={{width: '500px'}}>
                            {this.state.colaboradores.map((value) => {
                                return (
                                    <ListItem key={value} button>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={'imagem'}
                                                src={'/static/images/avatar/'}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={value.nome} />
                                        <ListItemText primary={value.matricula} />
                                        <ListItemText primary={value.email} />
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







