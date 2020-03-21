import React, { useState } from 'react'


const BUTTON_STYLE = {width:200, margin:'1rem'}
export const WelcomeForm = () => {
    const [ isActive, setActive ] = useState('is-active')
    const post = value => {
        console.log(value)
        setActive('')
    }

    return <div className={`modal ${isActive}`}>
        <div className='modal-background'/>
        <div className='modal-content' style={{width:350}}>
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">  How do you feel? </p>
                    <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </a>
                </header>
                <div class="card-content">
                    <div class="content has-text-centered">
                        <button class="button is-success is-light" style={BUTTON_STYLE} onClick={() => post(0)}>I'm Fine</button><br/>
                        <button class="button is-warning is-light" style={BUTTON_STYLE} onClick={() => post(1)}>I have symptoms</button><br/>
                        <button class="button is-danger is-light" style={BUTTON_STYLE} onClick={() => post(2)}>Definitively Sick</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}