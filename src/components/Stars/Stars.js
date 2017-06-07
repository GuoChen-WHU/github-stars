import React from 'react';
import { PropTypes } from 'prop-types';
import { Table, Pagination, Icon, Popconfirm, Button } from 'antd';
import { PAGE_SIZE } from '../../constants';
import styles from './Stars.css';

const Stars = ({ 
  list: dataSource, 
  page, 
  total, 
  navigate, 
  basePath,
  buttons
}) => {

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
      dataIndex: 'name',
      key: 'action',
      render: name => (
        <span>
          {buttons.map((button, index) =>
            button.popConfirmTitle ?
            <Popconfirm
              key={index}
              title={button.popConfirmTitle}
              onConfirm={() => button.clickHandler(name)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type={button.type}
                icon={button.icon}
                style={{ marginRight: 8 }}
              >
                {button.text}
              </Button>
            </Popconfirm> :
            <Button
              key={index} 
              type={button.type}
              icon={button.icon}
              onClick={() => button.clickHandler(name)}
              style={{ marginRight: 8 }}
            >
              {button.text}
            </Button>
          )}
        </span>
      )
    }
  ];

  const onPageChange = page => {
    navigate({
      pathname: basePath,
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
        total={total}
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
  total: PropTypes.number,
  navigate: PropTypes.func,
  basePath: PropTypes.string,
  buttons: PropTypes.object
};

export default Stars;
