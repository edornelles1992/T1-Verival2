import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';

export default class CadastroAlunos extends Component {
    render() {
        return (    
            <Typography variant="h4" >
                {this.props.text}
            </Typography>
        )
    }
}