import React, { Fragment, useState } from "react"
import { Consumer } from '../components/Data/context'

import Layout from "../components/layout"
import SEO from "../components/seo"

import { GeoLayer } from '../components/Map/Map'
import { WelcomeForm } from '../components/Forms/WelcomeForm'

import '../styles/style.scss'
const IndexPage = () => {
    const [ navigation, setNavigation ] = useState(null)

    const post = async (doc, db, id) => {
        await db.insertOne({value: doc, owner_id:id}).catch(console.log)
        setNavigation({ latitude: 23.6345, longitude: -102.5528 })
    }    

    return <Layout>
        <SEO title="Map" />
        <Consumer>{({ db, id }) => <Fragment>
            <WelcomeForm onSubmit={d => post(d, db, id)}/>
            <GeoLayer navigation={navigation}/>
        </Fragment>}</Consumer>
    </Layout>
}

export default IndexPage
