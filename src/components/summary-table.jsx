import React from "react";
import { Query } from "../js/query";
import { Link } from "framework7-react";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function SummaryTableRow({query, name, requested, category, review}) {
    return (
        <Query query={query} name={name}>
            {(response) => {
                return (
                    review ?
                        response.data[requested].map(item =>
                            <tr key={item.id}>
                                <td>{response.data[requested][0] ? category : ""}</td>
                                <td>{item.name}</td>
                                <td>{numbersWithSpaces(item.price) || "Wliczone"}</td>
                            </tr>
                        ) :
                        response.data[requested].map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{response.data[requested][0] ? category : ""}</td>
                                    <td>{item.name}</td>
                                    <td>{item.Opis && item.Opis.short_description} <br/> {(item.Opis && item.Opis.full_description) &&
                                    <Link href={process.env.REACT_APP_BACKEND_URL + item.Opis.full_description.url}
                                          external
                                          target="_blank"
                                    >
                                        Zobacz pełny opis
                                    </Link>
                                    }
                                    </td>
                                    <td>{numbersWithSpaces(item.price) || "Wliczone"}</td>
                                </tr>
                            );
                        })
                );
            }}
        </Query>
    );
}
