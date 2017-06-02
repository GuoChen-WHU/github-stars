import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';

import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import styles from './IndexPage.css';

import Sidebar from '../components/Sidebar/Sidebar';
import Stars from '../components/Stars/Stars';
import ArchiveModal from '../components/Archive/Modal';

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
        pathname: '/',
        query: { page: 1 }
      });
    }
  }

  render() {
    const { login, avatar_url } = this.props.userInfo;
    const { allArchives, editing, repo } = this.props.archive;
    const {
      navigate,
      unstar,
      startArchiveEdit, 
      endArchiveEdit, 
      addToArchive 
    } = this.props.actions;

    return (
      <Layout>
        <Sider>
          <Sidebar avatar_url={avatar_url} login={login} archives={allArchives} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Stars</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, paddingBottom: 60, background: '#fff', minHeight: 360 }}>
              <Stars 
                {...this.props.stars}
                actions={{navigate, unstar, startArchiveEdit}}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Github Stars ©2016 Created by Guo Chen
          </Footer>
        </Layout>
        <ArchiveModal 
          editing={editing} 
          archives={allArchives} 
          repo={repo}
          actions={{endArchiveEdit, addToArchive}}
        />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  login: PropTypes.bool,
  userInfo: PropTypes.object,
  archive: PropTypes.object,
  stars: PropTypes.object,
  actions: PropTypes.object
};

const mapStateToProps = state => ({
  login: state.user.login,
  userInfo: state.user.userInfo,
  archive: state.archive,
  stars: state.stars
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
