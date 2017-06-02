import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Select } from 'antd';
const { Option } = Select;
import styles from './Modal.css';

class ArchiveModal extends Component {

  static propTypes = {
    editing: PropTypes.bool,
    repo: PropTypes.string,
    archives: PropTypes.array,
    actions: PropTypes.object
  }

  state = {
    archiveSelected: ''
  }

  render() {
    const { editing, repo, archives, actions } = this.props;
    const { endArchiveEdit, addToArchive } = actions;
    return (
      <Modal
        title="Archive"
        visible={editing}
        onOk={() => {
          addToArchive(repo, this.state.archiveSelected);
          endArchiveEdit();
        }}
        onCancel={() => endArchiveEdit()}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Repo: {repo}</p>
        <br />
        <span>Archive: </span>
        <Select 
          className={styles.select}
          placeholder="Select a archive"
          onChange={(archive) => this.setState({ archiveSelected: archive })}
        >
          {archives.map(archive => <Option key={archive} value={archive}>{archive}</Option>)}
        </Select>
      </Modal>
    )
  }
}

export default ArchiveModal;
