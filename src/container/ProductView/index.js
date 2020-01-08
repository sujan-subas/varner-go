import React from 'react';
import { connect } from 'react-redux';
import Product from '../../components/ProductView';

const ProductContainer = (props) => {
    return (<Product {...props}/>)
}

export default connect(ProductContainer);