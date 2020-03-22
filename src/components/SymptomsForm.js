import React, { useState } from "react"
import Select from 'react-select';
import {Form, Button} from 'react-bootstrap';

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

const toSelectOptions = symptomsList => symptomsList.map(
  symptom => ({label: symptom.name, value: symptom.id})
);

export default props => {
  const [selectedSymptoms, setSymptoms] = useState([]);
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit(selectedSymptoms)
      }}
      className='container'
    >
        <Form.Group>
          <Form.Label>Selecciona uno o más síntomas</Form.Label>
          <Select options={toSelectOptions(SymptomsList)}
                  placeholder='Seleccionar'
                  isMulti
                  required
                  onChange={symptomsList => setSymptoms(symptomsList)}
          />
        </Form.Group>

        <div className='form-group'>
          <Button variant='primary' type='submit'>Continuar</Button>
          <Button variant='success' tyupe='submit' className='ml-1'>
            ¡No tengo ningún síntoma!
          </Button>
        </div>
    </Form>
  );
};