// const React = require('react')
import React from 'react'
import {Children} from 'react'


class Suspense extends React.Component {
    render(){
        return Children.only(this.props.fallback)
    }
}

export default Suspense