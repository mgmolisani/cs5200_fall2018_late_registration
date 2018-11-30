import React from 'react';

const ListItem = props => {
    return (
        <li style={{
            color: props.selected ? 'red' : 'blue'
        }}
        onClick={() => props.handleClick()}>
            {`${props.first} ${props.last}`}
        </li>
    );
};

ListItem.propTypes = {};

ListItem.defaultProps = {};

export default ListItem;