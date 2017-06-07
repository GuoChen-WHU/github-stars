import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import EventEmitter from '../../utils/EventEmitter';
import styles from './Controls.css';

const Controls = ({ name, destory, navigate }) => {
  return (
    <div>
      <Button 
        className={styles.control} 
        icon="edit"
        onClick={() => EventEmitter.trigger('modal.rename.show')}
      >
        Rename
      </Button>
      <Popconfirm 
        title="Are you sure delete this archive?"
        onConfirm={() => {
          navigate({ pathname: '/stars' });
          destory(name);
          message.success(`Archive ${name} is destoryed.`);
        }}
        okText="yes"
        cancelText="no"
      >
        <Button 
          className={styles.control} 
          type="danger" 
          icon="delete"
        >
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
}

export default Controls;
