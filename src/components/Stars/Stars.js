import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import styles from './Stars.css';

function Stars({ list: dataSource }) {

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

  return (
    <div className={styles.normal}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  list: state.stars.list
});

export default connect(mapStateToProps)(Stars);
