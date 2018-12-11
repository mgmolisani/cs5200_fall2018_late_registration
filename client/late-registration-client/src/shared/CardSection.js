import React from 'react';

const CardSection = props => {
    return (
        <div className='py-3'>
            <h3>
                {props.title}
            </h3>
            <hr/>
            <div className='row justify-content-center'>
                {props.children}
            </div>
        </div>
    );
};

CardSection.propTypes = {};

CardSection.defaultProps = {};

export default CardSection;