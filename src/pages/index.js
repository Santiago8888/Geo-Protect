import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { GeoLayer } from '../components/Map/Map'
import { WelcomeForm } from '../components/Forms/WelcomeForm'

import '../styles/style.scss'
const IndexPage = () => <Layout>
    <SEO title="Map" />
    <WelcomeForm />
    <GeoLayer/>
</Layout>

export default IndexPage
