# React Boilerplate

Boilerplate for React Univeral application, that is using Redux, React-router and Express

Project Structure: 

```
/app
/app/common - common resources of application, eg. component,s reducers, etc.
/app/client - client side configuration
/app/server - server side configuration
```

## Universal page

```js
import React, {Component, PropTypes} from 'react';
import connect from 'react-redux/lib/components/connect'
import {someAction} from '../actions'

@connect(null, {someAction})
export default class ExamplePage extends Component {

  // invoke in server.js 
  // see: https://github.com/Nebo15/react-boilerplate/blob/master/app/server/server.js#L92
  static fetchData ({query, params, store, history}) {
    store.dispatch(someAction());
  }
  
  // fetch on client side
  fetchData() {
    this.props.someAction();
  }

  componentDidMount () {
    fetchData();
  }
  
  render() {
    return (
      <h1>Example page</h1>
    )
  }

}

```
