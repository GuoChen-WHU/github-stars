import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Input, Button } from 'antd';
const SubMenu = Menu.SubMenu;
import { Link } from 'dva/router';
import styles from './Sidebar.css';

const Sidebar = ({ avatar_url, login, archives, createArchive }) => {
  return (
    <div>
      <h1 className={styles.logo}>Github Stars</h1>
      <img className={styles.avatar} src={avatar_url} alt="Avatar" />
      <h3 className={styles.username}>{login}</h3>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['archive']}>
        <Menu.Item key="1">
          <Link to="/stars?page=1">
            <Icon type="star" />
            <span className="nav-text">Stars</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="archive"
          title={<span><Icon type="switcher" /><span className="nav-text">Archive</span></span>}
        >
          {archives.map(archive => <Menu.Item key={archive}>
            <Link to={`/archive/${archive}?page=1`}>
              {archive}
            </Link>
          </Menu.Item>)}
          <Input 
            className={styles.input} 
            placeholder="add new archive..." 
            onPressEnter={(e) => {
              createArchive(e.target.value);
              e.target.value = '';
            }}
          />
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
