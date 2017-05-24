import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

import Stars from '../components/Stars/Stars';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Github Stars</h1>
      <Stars />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
