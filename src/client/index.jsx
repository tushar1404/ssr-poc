import React from "react"
import { hydrate } from 'react-dom'
import App from "../app"

import { BrowserRouter } from 'react-router-dom'

window.onload = () => {
    let root = document.getElementById('root')
    hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>, root)
}