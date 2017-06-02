import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import styles from './Sidebar.css';

const Sidebar = ({ avatar_url, login, archives}) => {
  return (
    <div>
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
          {archives.map(archive => <Menu.Item key={archive}>{archive}</Menu.Item>)}
        </SubMenu>
      </Menu>
    </div>
  );
}

Sidebar.propTypes = {
  avatar_url: PropTypes.string,
  login: PropTypes.string,
  archives: PropTypes.array
}

export default Sidebar;
