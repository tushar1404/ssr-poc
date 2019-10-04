import React from "react"
import {withStyles} from 'react-critical-css'
import styles from './styles'


class Sidebar extends React.Component {
    render(){
        let children = []
        for(let c=0;c<200;c++){
            let num = c%26
            let char = String.fromCharCode(num + 97)
            let text = `${char}${char}${char}`
            children.push(
                <div className="row" key={text + c}>
                    <span className="row-cell">{text}</span>
                    <span className="row-cell">{`${c*10}`}</span>
                </div>
            )
        }
        return (
            <div className="sidebar">
                {children}
            </div>
        )
    }
}

export default withStyles(styles)(Sidebar);