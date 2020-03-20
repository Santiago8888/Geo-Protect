import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { GeoLayer } from '../components/Map/Map'

const IndexPage = () => <Layout>
    <SEO title="Map" />
    <GeoLayer/>
</Layout>

export default IndexPage
