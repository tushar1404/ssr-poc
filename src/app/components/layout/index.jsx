import React from "react"
import {withStyles} from 'react-critical-css'
import styles from './styles'
import Sidebar from '../sidebar'


class Layout extends React.Component {
    render(){
        return (
            <div className="layout-container">
                <div className="header">
                    UPSTOX
                </div>
                <div className="main-container">
                    <Sidebar />
                    <div className="content-container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Layout);