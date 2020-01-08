import React from 'react';
import { connect } from 'react-redux';
import Info from '../../components/InfoContainer';

const InfoContainer = (props) => {
    return (<Info {...props}/>)
}

export default connect(InfoContainer);