import React, { Component } from "react"
import {Children} from 'react'
import { RegistryContext } from './contextProvider'

class DynamicModule extends Component {
    static contextType = RegistryContext;
  
    constructor(props, context){
      super(props, context)
      let {registry} = context;
      registry.addChunk && registry.addChunk(this.props.name)
    }
      render(){
        return Children.only(this.props.children)
      }
  }

  export default DynamicModule