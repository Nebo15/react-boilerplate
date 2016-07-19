import React, {Component, PropTypes} from 'react';
import connect from 'react-redux/lib/components/connect'
import {getPosts} from '../../actions/posts'
import Link from 'react-router/lib/Link'

if (__CLIENT__) {
  require('../../../../assets/sass/style.sass');
}

@connect((state, ownProps) => {
  const result = state.getIn(['posts','indexPagePosts']);
  return {
    posts: result.map(id => state.getIn(['posts','entities', 'posts', id])).toJS()
  }
}, {getPosts})
export default class IndexPage extends Component {


  static fetchData ({store}) {
    return store.dispatch(getPosts());
  }

  fetchData() {
    this.props.getPosts();
  }
  //componentWillReceiveProps() {
  //  this.fetchData();
  //}
  componentDidMount() {
    this.fetchData();
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
