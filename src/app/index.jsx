import React, { Component } from "react"
import routes from './routes'
import Layout from "./components/layout/index"
import {withStyles} from 'react-critical-css'
import styles from './styles'

class App extends Component {
    render(){
        return  <div className="app-container">
                    <Layout>
                        {routes}
                    </Layout>
                </div>
    }
}

export default withStyles(styles)(App)