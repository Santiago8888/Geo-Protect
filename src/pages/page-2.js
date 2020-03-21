import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SymptomsForm from "../components/SymptomsForm"

const submitForm = values => {
  console.log(values);
};

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <SymptomsForm onSubmit={submitForm} />
  </Layout>
)

export default SecondPage
