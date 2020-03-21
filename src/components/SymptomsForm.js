import React, { useState } from "react"
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';

/*

const SymptomsList = [
  {
    id: 1,
    name: 'Tos Seca',
  }, {
    id: 2,
    name: 'Tos con Sangre',
  }, {
    id: 3,
    name: 'Fiebre',
  }, {
    id: 4,
    name: 'Dolor muscular',
  }, {
    id: 5,
    name: 'Dolor de cabeza',
  }, {
    id: 6,
    name: 'Dolor de garganta',
  }, {
    id: 7,
    name: 'Dolor de pecho'
  },
  {
    id: 8,
    name: 'Diarrea'
  }, {
    id: 9,
    name: 'Rinorrea (Secreción Nasal)'
  }, {
    id: 10,
    name: 'Falta de aliento o dificultad para respirar'
  }, {
    id: 11,
    name: 'Neumonía en ambos pulmones'
  }
];
*/

const Styles = styled.section`
  @extend .container {
  
  }
`;

export default props => {
  const [formData, setData] = useState({});
  return (
    <Styles className='container'>
      <h1>¿Cómo te sientes Hoy?</h1>
      <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
        <Form>

        </Form>
      </Formik>
    </Styles>
  );
};