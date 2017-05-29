import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'; 
import styles from './IndexPage.css';

import Stars from '../components/Stars/Stars';

class IndexPage extends Component {

  componentWillMount() {
    const { login, dispatch } = this.props;
    if (!login) {
      dispatch(routerRedux.push({
        pathname: '/login'
      }));
    } else {
      dispatch(routerRedux.push({
        pathname: '/',
        query: { page: 1 }
      }));
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Github Stars</h1>
        <Stars />
      </div>
    );
  }
}

IndexPage.propTypes = {
  login: PropTypes.bool
};

const mapStateToProps = state => ({
  login: state.user.login
});

export default connect(mapStateToProps)(IndexPage);
