import React, { Component } from "react"
import * as path from "path"
import ReactDOMServer from "react-dom/server"
import resources from '../../app/resources.json'
import { ChunkRegistryProvider, ChunkRegistry } from "../../app/utils/chunkManager"
import {CriticalCSSProvider, StyleRegistry} from 'react-critical-css'
import { StaticRouter } from 'react-router-dom'
import App from '../../app'
import { getPushHeader } from "../../app/utils/header"
import { ChunkExtractor } from '@loadable/server'
const statsFile = path.resolve( process.cwd(), 'dist/client/loadable-stats.json')

const extractor = new ChunkExtractor({ statsFile, entrypoints: ["client"] })



export default async (ctx) => {
    if(ctx.query && ctx.query.optimized !== undefined){
        const app = extractor.collectChunks(
                        <StaticRouter location={ctx.url} context={{}}>
                            <App />
                        </StaticRouter>)
        let str = ReactDOMServer.renderToString(app)

        const scriptTags = extractor.getScriptTags()

        const linkTags = extractor.getLinkTags()

        const linkElements = extractor.getLinkElements()

        const styleTags = extractor.getStyleTags()
        
        let pushHeaders = linkElements.map( (ln) => {
            return `<${ln.props.href}>; rel=preload; as=${ln.props.as}`
        })
        let styles = await extractor.getCssString()
        ctx.set('Link', pushHeaders.join(","))
        await ctx.render("index", {
            content: str,
            styles: styles,
            scriptTags: scriptTags,
            linkTags: linkTags,
            styleTags: styleTags
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