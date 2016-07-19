import React, {Component, PropTypes} from 'react';
import Link from 'react-router/lib/Link';

class MainLayout extends Component {

    render() {
        return (
          <div>
            <nav>
              <Link to="/">Home</Link> <Link to="/about">About</Link>
            </nav>
            <hr/>
            <main>
              {this.props.children}
            </main>
          </div>
        )
    }

}

export default MainLayout
