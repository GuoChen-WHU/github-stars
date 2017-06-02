import React from 'react';
import Stars from '../Stars/Stars';

const Archive = ({ list }) => {
  return (
    <Stars list={list} page={1} maxPage={1} />
  )
};

export default Archive;