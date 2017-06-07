import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';

import Controls from '../components/Archive/Controls';
import StarsComponent from '../components/Stars/Stars';
import RenameModal from '../components/Archive/Modal';
import * as actions from '../actions';

class Archive extends Component {

  static propTypes = {
    archive: PropTypes.object,
    actions: PropTypes.object
  }

  render() {
    const name = this.props.params.name;
    const list = this.props.archive.list || [];
    const total = this.props.archive[name].length;
    const page = this.props.archive.page;
    const { renameArchive, destoryArchive, removeFromArchive, navigate } = this.props.actions;

    return (
      <div>
        <Controls 
          name={name} 
          destory={destoryArchive}
          navigate={navigate}
        />
        <StarsComponent 
          list={list} 
          page={page} 
          total={total} 
          navigate={navigate}
          basePath={`/archive/${name}`}
          buttons={[
            {
              type: 'default',
              icon: 'close',
              clickHandler: removeFromArchive.bind(null, name),
              popConfirmTitle: 'Are you sure to remove this repo from archive?',
              text: 'Remove'
            }
          ]}
        />
        <RenameModal
          archive={name}
          rename={renameArchive}
          navigate={navigate}
        />
      </div>
    ); 
  }
}

const mapStateToProps = state => ({
  archive: state.archive
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);