import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {getPosts} from '../../actions/posts'
import {Link} from 'react-router'

@connect((state) => {
  const result = state.posts.get('result');
  return {
    posts: result.map(id => state.posts.getIn(['entities', 'posts', id])).toJS()
  }
}, {getPosts})
export default class IndexPage extends Component {

  static fetchData ({store}) {
    return store.dispatch(getPosts());
  }

  render() {
    return (
      <div>
        <h1>
          Index page
        </h1>
        <ul>
          {
            this.props.posts.map(function (item) {
              return <li key={item.id}>
                <Link to={`/posts/${item.id}`}>{item.title}</Link>
              </li>
            })
          }
        </ul>
      </div>
    )
  }

}
