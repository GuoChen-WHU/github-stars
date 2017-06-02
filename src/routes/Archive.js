import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { bindActionCreators } from 'redux';

import StarsComponent from '../components/Stars/Stars';
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

    return <StarsComponent 
      list={list} 
      page={page} 
      total={total} 
      actions={{ navigate: this.props.actions.navigate }}
      editable={false}
      basePath={`/archive/${name}`}
    />;
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