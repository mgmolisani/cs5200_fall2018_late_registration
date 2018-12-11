import React from 'react';

const Omnibar = props => {
    return (
        <div className='input-group my-3'>
            <div className='input-group-prepend'>
            <span className='input-group-text'>
                Filter Results
            </span>
            </div>
            <input className='form-control'
                   id={'search'}
                   type={'text'}
                   value={props.value}
                   onChange={props.onChange}/>
            {props.showButton
            && <div className='input-group-append'>
                <button className='btn btn-dark'
                        onClick={props.onClick}>
                    {props.buttonLabel}
                </button>
            </div>}
        </div>
    );
};

Omnibar.propTypes = {};

Omnibar.defaultProps = {};

export default Omnibar;