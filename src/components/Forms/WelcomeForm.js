import React, { useState } from 'react'


const BUTTON_STYLE = {width:200, margin:'1rem'}
export const WelcomeForm = ({ onSubmit }) => {
    const [ isActive, setActive ] = useState('is-active')
    const post = async doc => {
        setActive('')
        onSubmit(doc)
    }

    return <div className={`modal ${isActive}`}>
        <div className='modal-background'/>
        <div className='modal-content' style={{width:350}}>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">  How do you feel? </p>
                </header>
                <div className="card-content">
                    <div className="content has-text-centered">
                        <button 
                            className="button is-success is-light" 
                            style={BUTTON_STYLE} 
                            onClick={() => post(0)}
                        >I'm Fine</button><br/>
                        <button 
                            className="button is-warning is-light" 
                            style={BUTTON_STYLE} 
                            onClick={() => post(1)}
                        >I have symptoms</button><br/>
                        <button 
                            className="button is-danger is-light" 
                            style={BUTTON_STYLE} 
                            onClick={() => post(2)}
                        >Definitively Sick</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
