import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import styles from './Stars.css';

function Stars({ dispatch, list: dataSource, page, maxPage }) {

  const columns = [
    {
      title: 'Owner',
      dataIndex: 'owner_avatar',
      key: 'avatar',
      render: (avatar, record) => 
        <a href={record.owner_url} target="_blank">
          <img src={avatar} alt="owner" width="32px" height="32px" />
        </a>
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
    }
  ];

  const onPageChange = page => {
    dispatch(routerRedux.push({
      pathname: '/',
      query: { page }
    }));
  }

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

const mapStateToProps = state => ({
  list: state.stars.list,
  page: state.stars.page,
  maxPage: state.stars.maxPage
});

export default connect(mapStateToProps)(Stars);
