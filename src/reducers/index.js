const initialState = {
    header: {
        timer: 0
    }
};

const formReducer = (state = initialState, action) => {
    console.log('state', state);
    switch(action.type) {
        default:
            return state;
    }
};

export default formReducer;