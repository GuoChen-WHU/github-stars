import React from 'react';
import { PropTypes } from 'prop-types';
import { Table, Pagination, Icon, Popconfirm, Button } from 'antd';
import { PAGE_SIZE } from '../../constants';
import styles from './Stars.css';

function Stars({ list: dataSource, page, maxPage, actions }) {

  const columns = [
    {
      title: 'Owner',
      dataIndex: 'owner_avatar',
      key: 'avatar',
      render: (avatar, record) => (
        <a href={record.owner_url} target="_blank">
          <img src={avatar} alt="owner" width="32px" height="32px" />
        </a>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={record.html_url} target="_blank">{text}</a>
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language'
    },
    {
      title: 'Stars',
      dataIndex: 'stargazers_count',
      key: 'stars',
      render: num => <span><Icon type="star" /> {num}</span>
    },
    {
      title: 'Forks',
      dataIndex: 'forks_count',
      key: 'forks',
      render: num => <span><Icon type="fork" /> {num}</span>
    },
    {
      title: 'Updated at',
      dataIndex: 'updated_at',
      key: 'updated_at'
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button 
            type="primary" 
            icon="book" 
            onClick={achiveHandler.bind(null, record.name)}
            style={{marginRight: 8}}
          >
            Achive
          </Button>
          <Popconfirm 
            title="Confirm to unstar?" 
            onConfirm={unstarHandler.bind(null, record.name)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon="star">Unstar</Button>
          </Popconfirm>
        </span>
      )
    }
  ];

  const achiveHandler = name => {
    actions.startArchiveEdit(name);
  };

  const unstarHandler = name => {
    actions.unstar(name);
  };

  const onPageChange = page => {
    actions.navigate({
      pathname: '/stars',
      query: { page }
    });
  };

  return (
    <div className={styles.normal}>
      <Table
        columns={columns}
        dataSource={dataSource}
        expandedRowRender={record => <p>{record.description}</p>}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={maxPage * PAGE_SIZE}
        current={page}
        pageSize={PAGE_SIZE}
        onChange={onPageChange}
      />
    </div>
  );
}

Stars.propTypes = {
  list: PropTypes.array,
  page: PropTypes.number,
  maxPage: PropTypes.number,
  actions: PropTypes.object
};

export default Stars;
