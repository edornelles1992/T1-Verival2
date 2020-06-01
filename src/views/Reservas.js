import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {getReservas} from '../services/index'
import toMoneyConversion from '../utils/NumberUtility';

export default class Reservas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reservas: [],
      selectedTeamIndex: 0,
      workingSoftware: "0",
      process: "0",
      pitch: "0",
      innovation: "0",
      teamFormation: "0",
    };
  }

  componentDidMount = async () => {
    let reservas = await getReservas()
    this.setState({ reservas });
  };

  render() {
    console.log(this.state.reservas)
    return (
      <Grid container justify="center" alignItems="center" spacing={6} direction="column" style={{marginTop: '10px'}}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Reservas
          </Typography>
        </Grid>
        <Grid item style={{width: "50%"}}>
          {this.state.reservas.map((reserva, index) => (
          <ExpansionPanel TransitionProps={{unmountOnExit: true}} onChange={() => this.setState({selectedTeamIndex: index})}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls={"panel" + index + "c-content"}
              id={"panel" + index + "c-header"}
            >
              <Typography variant="h6">{"Reserva nº " + reserva.id}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid item xs={12}>
            <Typography>{"Responsável: " + reserva.nome}</Typography>
            <Typography>{"Data Inicio: " + new Date(reserva.dataInicio).toLocaleDateString() + " " + new Date(reserva.dataInicio).toLocaleTimeString('pt-BR', { timeZone: 'UTC', hour12: false })}</Typography>
            <Typography>{"Data Fim: " + new Date(reserva.dataFim).toLocaleDateString() + " " + new Date(reserva.dataFim).toLocaleTimeString('pt-BR', { timeZone: 'UTC', hour12: false })}</Typography>
            <Typography>{"Custo: R$ " + toMoneyConversion(reserva.custo)}</Typography>
            <Typography>{"Recurso: " + reserva.recurso.nome}</Typography>
            <Typography>{"Tipo: " + reserva.recurso.tipo}</Typography>
            </Grid>
            </ExpansionPanelDetails>
            <Divider/>
            <ExpansionPanelActions>
              <Button size="small" onClick={this.resetValues}>Cancelar</Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
          )
          )
          }
        </Grid>
      </Grid>
    );
  }


}







