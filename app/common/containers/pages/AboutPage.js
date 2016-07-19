import React, {Component, PropTypes} from 'react';
import connect from 'react-redux/lib/components/connect'

@connect()
export default class AboutPage extends Component {


  render() {
    return (
      <h1>About page</h1>
    )
  }

}
