import React, {Component} from 'react';
import ListItem from './ListItem';

export default class List
    extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            people: [],
            selected: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        this.setState({selected: index});
    };

    fetchData() {
        this.setState({
            people: [
                {
                    first: 'Mike',
                    last: 'Molisani'
                },
                {
                    first: 'Shawn',
                    last: 'Martin'
                }
            ]
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected !== this.state.selected) {
            console.log('It switched');
        } else {
            console.log('It stayed the same')
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {people, selected} = this.state;
        return (
            <ol>
                {people.map((person, index) => {
                    return <ListItem key={index}
                                     first={person.first}
                                     last={person.last}
                                     selected={index === selected}
                                     handleClick={() => this.handleClick(index)}/>;
                })}
            </ol>
        );
    }
}