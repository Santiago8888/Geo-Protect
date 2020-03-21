import { Consumer } from '../Data/context'
import React, { useState } from 'react'


const BUTTON_STYLE = {width:200, margin:'1rem'}
export const WelcomeForm = () => {
    const [ isActive, setActive ] = useState('is-active')
    const post = async (doc, db, id) => {
        await db.insertOne({value: doc, owner_id:id}).catch(console.log)
        const docs = await db.find({}, { limit: 100 }).asArray().catch(console.log)
        console.log(docs)
        setActive('')
    }

    return <Consumer>{({ db, id }) => 
        <div className={`modal ${isActive}`}>
            <div className='modal-background'/>
            <div className='modal-content' style={{width:350}}>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">  How do you feel? </p>
                        <a href="#" className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </a>
                    </header>
                    <div className="card-content">
                        <div className="content has-text-centered">
                            <button 
                                className="button is-success is-light" 
                                style={BUTTON_STYLE} 
                                onClick={() => post(0, db, id)}
                            >I'm Fine</button><br/>
                            <button 
                                className="button is-warning is-light" 
                                style={BUTTON_STYLE} 
                                onClick={() => post(1, db, id)}
                            >I have symptoms</button><br/>
                            <button 
                                className="button is-danger is-light" 
                                style={BUTTON_STYLE} 
                                onClick={() => post(2, db, id)}
                            >Definitively Sick</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }</Consumer>
}
