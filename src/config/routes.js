import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Colaboradores from '../views/Colaboradores';
import Recursos from '../views/Recursos';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Reservas from "../views/Reservas";
import CadastroReservas from "../views/CadastroReservas"


export default function Routes() {

    const history = createBrowserHistory();

    return (
        <Router history={history}>
            <AppBar>
                <Tabs aria-label="simple tabs example">
                    <Tab component={Link} to={'/colaboradores'} label="Colaboradores" />
                    <Tab component={Link} to={'/recursos'} label="Recursos" />
                    <Tab component={Link} to={'/reservas'} label="Reservas" />
                </Tabs>
            </AppBar>
            <Switch>
                <Route exact path="/colaboradores" component={Colaboradores}/>
                <Route exact path="/recursos" component={Recursos}/>
                <Route exact path="/reservas" component={Reservas}/>
                <Route exact path="/cadastro-reservas" component={CadastroReservas}/>
            </Switch>
        </Router>
    );
}
