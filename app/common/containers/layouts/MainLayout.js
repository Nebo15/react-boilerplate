import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class MainLayout extends Component {

    render() {
        return (
          <div>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </nav>
            <main>
              {this.props.children}
            </main>
          </div>
        )
    }

}

export default MainLayout
