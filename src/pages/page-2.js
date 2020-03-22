import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SymptomsForm from "../components/SymptomsForm"
import {Container, Row, Col} from 'react-bootstrap';

const submitForm = values => {
  console.log(values);
};

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <Container className='mt-3'>
      <Row>
        <Col>
          <section>
            <h1 className='title'>¿Cómo te sientes hoy?</h1>
            <SymptomsForm onSubmit={submitForm} />
          </section>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default SecondPage
