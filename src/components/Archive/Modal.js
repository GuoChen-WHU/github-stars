import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message } from 'antd';
import EventEmitter from '../../utils/EventEmitter';
import styles from './Modal.css';

class RenameModal extends Component {
  
  static propTypes = {
    archive: PropTypes.string,
    rename: PropTypes.func,
    navigate: PropTypes.func
  }

  state = { visible: false, input: '' }

  showModal = () => {
    this.setState({ visible: true });
  }

  inputChangeHandler = (e) => {
    this.setState({ input: e.target.value });
  }

  componentDidMount() {
    EventEmitter.on('modal.rename.show', this.showModal);
  }

  componentWillUnmount() {
    EventEmitter.off('modal.rename.show');
  }

  render() {
    const { archive, rename, navigate } = this.props;
    const { visible, input: now } = this.state;
    return (
      <Modal
        title="Rename archive"
        visible={visible}
        onOk={() => {
          navigate({ pathname: `/archive/${now}`, query: { page: 1 } });
          rename(archive, now);
          this.setState({ visible: false });
          message.success(`${archive} is renamed to ${now}`);
        }}
        onCancel={() => this.setState({ visible: false })}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Rename <em>{archive}</em> to <Input onChange={this.inputChangeHandler} /></p>
      </Modal>
    );
  }
}

export default RenameModal;
