import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ArchiveComponent from '../components/Archive/Archive';

class Archive extends Component {

  static propTypes = {
    archive: PropTypes.object
  }

  render() {
    const name = this.props.params.name;
    const list = this.props.archive[name + 'list'];    
    return <ArchiveComponent list={list} />;
  }
}

const mapStateToProps = state => ({
  archive: state.archive
});

export default connect(mapStateToProps)(Archive);