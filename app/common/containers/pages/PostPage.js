
import React, {Component, PropTypes} from 'react';
import connect from 'react-redux/lib/components/connect'
import {getPost} from '../../actions/posts'

@connect((state, ownProps) => {
  return state.getIn(['posts', 'entities', 'posts', ownProps.params.id]).toJS();
}, {getPost})
export default class PostPage extends Component {

  static fetchData ({store, params}) {
    return store.dispatch(getPost(params.id));
  }

  fetchData() {
    this.props.getPost(this.props.params.id);
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <h1>
          Post page
        </h1>
        <h3>{this.props.title}</h3>
        <h5>{this.props.description}</h5>
      </div>
    )
  }

}
