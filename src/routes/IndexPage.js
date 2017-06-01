import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'; 
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
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
    const { login, avatar_url } = this.props.userInfo;
    return (
      <Layout>
        <Sider>
          <h1 className={styles.logo}>Github Stars</h1>
          <img className={styles.avatar} src={avatar_url} alt="Avatar" />
          <h3 className={styles.username}>{login}</h3>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <span>
                <Icon type="star" />
                <span className="nav-text">Stars</span>
              </span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="switcher" /><span className="nav-text">Archive</span></span>}
            >
              <Menu.Item key="2">Archive 1</Menu.Item>
              <Menu.Item key="3">Archive 2</Menu.Item>
              <Menu.Item key="4">Archive 3</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Stars</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, paddingBottom: 60, background: '#fff', minHeight: 360 }}>
              <Stars />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Github Stars ©2016 Created by Guo Chen
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  login: PropTypes.bool,
  userInfo: PropTypes.object
};

const mapStateToProps = state => ({
  login: state.user.login,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps)(IndexPage);
