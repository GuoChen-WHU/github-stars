import React from 'react';
import { connect } from 'dva';
import { Table, Pagination } from 'antd';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import styles from './Stars.css';

function Stars({ dispatch, list: dataSource, page, maxPage }) {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
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
