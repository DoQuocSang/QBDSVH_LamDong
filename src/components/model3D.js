import React from "react";
import '../styles/model.css';


export default function Model( { children, isOpen, isClose }) {

    return(
        <article className= {isOpen ? 'model is-open' : 'model'}>
            <button
                className="close-model"
                onClick={() => { isClose() }}
            ></button>
            <div className="model-container">
                {children}
            </div>

        </article>
    )
}