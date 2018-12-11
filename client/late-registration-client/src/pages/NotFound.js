import React, {Component} from 'react';

export default class NotFound
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row justify-content-center m-3'>
                <h1>
                    404: Try something else.
                </h1>
            </div>
        );
    }
}