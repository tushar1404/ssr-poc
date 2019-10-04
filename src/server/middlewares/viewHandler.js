import React, { Component } from "react"
import ReactDOMServer from "react-dom/server"
import resources from '../../app/resources.json'
import { ChunkRegistryProvider, ChunkRegistry } from "../../app/utils/chunkManager"
import {CriticalCSSProvider, StyleRegistry} from 'react-critical-css'
import { StaticRouter } from 'react-router-dom'
import App from '../../app'
import { getPushHeader } from "../../app/utils/header"


export default async (ctx) => {
    if(ctx.query && ctx.query.optimized !== undefined){
        let chunkRegistry = new ChunkRegistry()
        const styleRegistry = new StyleRegistry()
        let str = ReactDOMServer.renderToString(
            <CriticalCSSProvider registry={styleRegistry}>
                <ChunkRegistryProvider registry={chunkRegistry}>
                    <StaticRouter location={ctx.url} context={{}}>
                            <App />
                    </StaticRouter>
                </ChunkRegistryProvider>
            </CriticalCSSProvider>
        )
        let pushHeader = `${getPushHeader(resources['client.js'], 'script')},${getPushHeader(resources['client.css'], 'style')}`
        chunkRegistry.chunks.map((name) => {
            let path = resources[`${name}.js`]
            pushHeader += `,${getPushHeader(path, 'script')}`
        })
        const styles = styleRegistry.getCriticalCSS()
        
        ctx.set('Link', pushHeader)
        await ctx.render("index", {
            content: str,
            scripts: [resources['client.js']],
            styleSheets: [resources['client.css']],
            styles: styles,
        })
    }else{
        await ctx.render("index", {
            content: '',
            scripts: [resources['client.js']],
            styleSheets: [resources['client.css']],
            styles: '',
        })
    }
}