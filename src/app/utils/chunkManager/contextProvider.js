import React, { Component } from "react"

const RegistryContext = React.createContext({
    registry: {}
  })
  
  class ChunkRegistryProvider extends Component {
      render(){
        return <RegistryContext.Provider value={{
          registry: this.props.registry
        }} >
            {this.props.children}
            </RegistryContext.Provider>
      }
  }

  export  { ChunkRegistryProvider, RegistryContext }