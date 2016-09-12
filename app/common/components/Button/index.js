import React, {Component, PropTypes} from 'react';

import styles from './styles.scss'

export default (props) => (<button className={styles.btn} type="button" {...props}/>)
