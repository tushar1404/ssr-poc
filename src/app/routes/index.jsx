import React, { lazy, Suspense, Fragment } from "react"
import { DynamicModule } from '../utils/chunkManager'
import {Route} from 'react-router-dom'
import Loader from '../components/loader'

const DetailsLazy = lazy(() => (
    import(/* webpackChunkName: "details" */'../pages/details')
))

const HomeLazy = lazy(() => {
    return import(/* webpackChunkName: "home" */'../pages/home')
})


const routes =  (
    <Fragment>
        <Route exact path="/details" render={ () => {
            return  <DynamicModule name="details">
                        <Suspense fallback={<Loader />} >
                            <DetailsLazy />
                        </Suspense>
                    </DynamicModule>
        } }/>
        <Route exact path="/" render={ () => {
            return  <DynamicModule name="home">
                        <Suspense fallback={<Loader />} >
                            <HomeLazy />
                        </Suspense>
                    </DynamicModule>
        } }/>
    </Fragment>)

export default routes