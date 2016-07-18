
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {getPost} from '../../actions/posts'
import {Link} from 'react-router'

@connect((state) => {
  const result = state.posts.get('result');
  return state.posts.getIn(['entities', 'posts', result]).toJS();
}, {getPost})
export default class PostPage extends Component {

  static fetchData ({store, params}) {
    return store.dispatch(getPost(params.id));
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
