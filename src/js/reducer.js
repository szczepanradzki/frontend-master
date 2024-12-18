export const offerComponent = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                [action.payload.key]: {value: action.payload.value, price: action.payload.price}
            };
        case "CLEAR":
            return state = {};
        default:
            return {state};
    }
};

export const summaryOffer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        default:
            return {state};
    }
};
