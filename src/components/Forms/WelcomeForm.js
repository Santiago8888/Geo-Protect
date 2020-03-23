import React, { useState } from 'react'


const symptoms_types = [
    {text: 'Cough (Tos)', value: 1}, 
    {text: 'Fever (Fiebre)', value: 2 }, 
    {text: 'Cold (Resfriado)', value: 3 }, 
    {text: 'Muscle aches (Dolores)', value: 4 }
]

const BUTTON_STYLE = {width:300, margin:'1rem'}
export const WelcomeForm = ({ onSubmit }) => {
    const [ val, setVal ] = useState(null)
    const [ isActive, setActive ] = useState('is-active')
    const [ showSymptoms, setShowSymptoms ] = useState(false)
    const [ symptoms, setSymptoms ] = useState(symptoms_types.map(s => ({...s, checked:false})))

    const post = async v => {
        setVal(v)
        if(v && !showSymptoms){ setShowSymptoms(true) } 
        else{ 
            setActive('')
            onSubmit({ value: v, symptoms: symptoms.filter(({ checked }) => checked) })
        }
    }

    const health_form =  <div className="card">
        <header className="card-header">
            <p className="card-header-title">  How is your health?/ ¿Cómo esta tu salud?</p>
        </header>
        <div className="card-content">
            <div className="content has-text-centered">
                <button 
                    className="button is-success is-light" 
                    style={BUTTON_STYLE} 
                    onClick={() => post(0)}
                >I'm Fine (Estoy bien) </button><br/>
                <button 
                    className="button is-warning is-light" 
                    style={BUTTON_STYLE} 
                    onClick={() => post(1)}
                >I have symptoms (Presento sintomas)</button><br/>
                <button 
                    className="button is-danger is-light" 
                    style={BUTTON_STYLE} 
                    onClick={() => post(2)}
                >Definitively Sick (Estoy enfermo)</button>
            </div>
        </div>
    </div>


    const symptoms_form = <div className="card">
        <header className="card-header">
            <p className="card-header-title">  What symptoms do you present?/ ¿Qué sintomas presentas?</p>
        </header>
        <div className="card-content">
            <div className="content has-text-centered">
                {symptoms.map(({ text, value, checked })  => <label 
                    className="checkbox" 
                    style={{display:'block', margin:'1rem', textAlign: 'left', paddingLeft: 50}}
                >
                    <input 
                        type="checkbox" 
                        checked={checked} 
                        style={{padding: 10 }}
                        onChange={() => setSymptoms(symptoms.map(s => s.value === value ? {...s, checked: !s.checked } : s))}
                    /> <span style={{ paddingLeft: 25 }}> {text} </span><br/>
                </label>)}
                
                <button 
                    className="button is-primary is-light" 
                    style={BUTTON_STYLE} 
                    onClick={() => post(val)}
                >Submit (Enviar)</button>
            </div>
        </div>
    </div>

    return <div className={`modal ${isActive}`}>
        <div className='modal-background'/>
        <div className='modal-content' style={{width:400}}>
            { showSymptoms ? symptoms_form : health_form }
        </div>
    </div>
}
