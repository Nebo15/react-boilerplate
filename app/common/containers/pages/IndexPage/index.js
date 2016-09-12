import React, {Component, PropTypes} from 'react';

import Button from '../../../components/Button'

export default class IndexPage extends Component {
    // constructor

    // event-handlers

    // component life-cycle events
    componentWillMount() {
        // add event listeners (Flux Store, WebSocket, document, etc.)
    }

    componentDidMount() {
        // React.getDOMNode()
    }

    componentWillUnmount() {
        // remove event listeners (Flux Store, WebSocket, document, etc.)
    }

    // getters

    // setters

    render() {
        return (<div>
          <h1>Index Page</h1>
          <Button>click on me</Button>
        </div>)
    }

}
// defaultProps
IndexPage.defaultProps = {}
// propTypes
IndexPage.propTypes = {}
