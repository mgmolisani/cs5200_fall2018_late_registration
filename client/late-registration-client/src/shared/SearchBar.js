import React from 'react';

const SearchBar = props => {
    return (
        <div className='form-group mt-3'>
            <label htmlFor={'search'}>
                Filter Results
            </label>
            <input className='form-control'
                   id={'search'}
                   type={'text'}
                   value={props.value}
                   onChange={props.onChange}/>
        </div>
    );
};

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;