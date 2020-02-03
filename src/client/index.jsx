import React from "react"
import { hydrate } from 'react-dom'
import App from "../app"
import { loadableReady } from '@loadable/component'

import { BrowserRouter } from 'react-router-dom'

window.onload = () => {
    loadableReady( () => {
        let root = document.getElementById('root')
        hydrate(
            <BrowserRouter>
                <App />
            </BrowserRouter>, root)
    })
}