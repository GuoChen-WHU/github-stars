import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';

import StarsComponent from '../components/Stars/Stars';
import ArchiveModal from '../components/Stars/Modal';
import * as actions from '../actions';

class Stars extends Component {
  render() {
    const { allArchives, editing, repo } = this.props.archive;
    const {
      navigate,
      unstar,
      startArchiveEdit,
      endArchiveEdit, 
      addToArchive 
    } = this.props.actions;

    return (
      <div>
        <StarsComponent 
          {...this.props.stars}
          actions={{navigate, unstar, startArchiveEdit}}
        />
        <ArchiveModal 
          editing={editing} 
          archives={allArchives} 
          repo={repo}
          actions={{endArchiveEdit, addToArchive}}
        />
      </div>
    );
  }
}

Stars.propTypes = {
  stars: PropTypes.object,
  archive: PropTypes.object,
  actions: PropTypes.object
};

const mapStateToProps = state => ({
  stars: state.stars,
  archive: state.archive
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stars);