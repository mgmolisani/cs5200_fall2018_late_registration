import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Admin
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Admin has successfully been created.
            </div>
        );
    }
}