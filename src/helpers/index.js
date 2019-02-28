import React from 'react';

export const renderInput = ({ input, id, label, type, meta: { error, touched } }) => {
    return (
        <div className="row">
            <div className="col s12">
                <label>{label}</label>
                <input {...input} id={id} type={type || "text"} autoComplete="off" className="validate" />
                <p className="red-text text-darken-2">{touched && error}</p>
            </div>
        </div >
    )
}