import React, { lazy, Suspense, Fragment } from "react"
import { DynamicModule } from '../utils/chunkManager'
import {Route} from 'react-router-dom'
import Loader from '../components/loader'
import loadable from '@loadable/component'

const DetailsLazy = loadable(() => (
    import(/* webpackChunkName: "details" */'../pages/details')
), {fallback: <Loader />})

const HomeLazy = loadable(() => {
    return import(/* webpackChunkName: "home" */'../pages/home')
})


const routes =  (
    <Fragment>
        <Route exact path="/details" render={ () => {
            return  <DynamicModule name="details">
                        <DetailsLazy />
                    </DynamicModule>
        } }/>
        <Route exact path="/" render={ () => {
            return  <DynamicModule name="home">
                        <HomeLazy />
                    </DynamicModule>
        } }/>
    </Fragment>)

export default routes