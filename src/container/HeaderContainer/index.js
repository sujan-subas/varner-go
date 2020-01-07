import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/HeaderContainer';

const HeaderContainer = (props) => {
    return (<Header {...props}/>)
}

export default connect(HeaderContainer);