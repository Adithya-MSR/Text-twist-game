import React, { Component } from 'react'
// import Header from './Header'
import Contents from './Contents'
// import Footer from './Footer'

import CssBaseline from '@material-ui/core/CssBaseline';

export default class Home extends Component {
    render() {
        return (
            <div>
                <CssBaseline />
                <Contents/>
            </div>
        )
    }
}
