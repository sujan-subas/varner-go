import React from 'react';
import { connect } from 'react-redux';
import Orders from '../../components/OrderView';

const OrdersContainer = (props) => {
    return (<Orders {...props}/>)
}

export default connect(OrdersContainer);