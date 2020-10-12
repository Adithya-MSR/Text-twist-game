import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';

class Contents extends Component {

    routeMe = () => {

        this.props.history.push('/game')
    }
    render() {
        return (
            <div style={{

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h3 style={{
                    marginTop: '30%',
                    fontWeight: 'bolder',
                    fontSize: '40px'
                }}>Text Twist Game</h3>
                <br />
                <Button variant="outlined" size="large" color="primary" onClick={this.routeMe} >
                     Start Game
                    </Button>


            </div>
        )
    }
}

export default withRouter(Contents)
