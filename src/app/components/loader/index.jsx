import React from "react"
import {withStyles} from 'react-critical-css'
import styles from './styles'


class Loader extends React.Component {
    render(){
        return (
            <div className="loader">
                <div className="lds-ellipsis">
                    <div></div><div></div><div></div><div></div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Loader);