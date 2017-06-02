import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';

import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import styles from './IndexPage.css';

import Sidebar from '../components/Sidebar/Sidebar';

import * as actions from '../actions';

class IndexPage extends Component {

  componentWillMount() {
    const { login, actions } = this.props;
    if (!login) {
      actions.navigate({
        pathname: '/login'
      });
    } else {
      actions.navigate({
        pathname: '/stars',
        query: { page: 1 }
      });
    }
  }

  render() {
    const { login: username, avatar_url } = this.props.userInfo;
    const allArchives = this.props.archives;
    const pathname = this.props.location.pathname;
    const paths = pathname.split('/');

    return (
      <Layout>
        <Sider>
          <Sidebar avatar_url={avatar_url} login={username} archives={allArchives} />
        </Sider>
        <Layout>
          <Header className={styles.header} />
          <Content className={styles.content}>
            <Breadcrumb className={styles.breadcrumb}>
              {paths.map(path => <Breadcrumb.Item key={path}>{path.replace(/^\w/, s => s.toUpperCase())}</Breadcrumb.Item>)}
            </Breadcrumb>
            <div className={styles['inner-content']}>
              {this.props.children}
            </div>
          </Content>
          <Footer className={styles.footer}>
            Github Stars ©2016 Created by Guo Chen
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  login: PropTypes.bool,
  userInfo: PropTypes.object,
  archives: PropTypes.array
};

const mapStateToProps = state => ({
  login: state.user.login,
  userInfo: state.user.userInfo,
  archives: state.archive.allArchives
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
