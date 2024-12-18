import React from "react";
import {useQuery} from "@apollo/react-hooks";

export const Query = ({query, children, id, name}) => {
    const {loading, error, data} = useQuery(query, {
        variables: {
            id: id || null,
            name: name || null
        }
    });
    if(loading) {
        return <p>Loading...</p>;
    }
    if(error) {
        return <p>Error: No results Found</p>;
    }
    return children({data});
};
