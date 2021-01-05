import React, { useState, useRef } from 'react'

export const FormWithRef = () => {
    const [items, setItems] = useState([]);
    const valueInputRef = useRef();
    const addToList = () => {
        if(valueInputRef.current.value == ''){
            alert('enter value...');
            valueInputRef.current.focus();
            return;
        }

        // hoc => high order component

        //hook

        setItems([...items, valueInputRef.current.value]);
        valueInputRef.current.value = '';
        valueInputRef.current.focus();
    }
    return (
        <div className="card">
            <div className="card-header">useRef Sample</div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <label>نام گروه : </label>
                        <input ref={valueInputRef}/>
                        <button className="btn btn-primary btn-sm mr-2" onClick={addToList}>افزودن به لیست</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4>گروه ها : </h4>
                        <ul>
                        {items.map((item,index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
