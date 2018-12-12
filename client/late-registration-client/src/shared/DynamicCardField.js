import React from 'react';

const DynamicCardField = props => {
    const {id, label, value, defaultValue, onChange, isEditing, hidden, type, checked} = props;
    const fieldId = id + '_' + label;
    return (
        !hidden || isEditing
            ? <div className='form-group'>
                <label htmlFor={fieldId}>
                    {label}
                </label>
                {
                    isEditing
                        ? <input className='form-control'
                                 id={fieldId}
                                 type={type || 'text'}
                                 checked={checked}
                                 value={value}
                                 placeholder={defaultValue}
                                 onChange={onChange}/>
                        : <h5>
                            {defaultValue}
                        </h5>
                }
            </div>
            : null
    );
};

DynamicCardField.propTypes = {};

DynamicCardField.defaultProps = {};

export default DynamicCardField;