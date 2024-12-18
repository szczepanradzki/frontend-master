import React from "react";
import {getSelectedMachine} from "../graphql/selected-machine";
import {Block, BlockTitle, Link} from "framework7-react";
import {Query} from "../js/query";

export function MachineHeader(props) {
    return (
        <Query query={getSelectedMachine} name={props.id}>
            {({data: {machines}}) => {
                return (
                    <Block>
                        <BlockTitle large>
                            {machines[0].name}
                        </BlockTitle>
                        <Block className="text-center">
                            <h2>
                                {machines[0].Opis.short_description}
                            </h2>
                            {machines[0].Opis.full_description &&
                            <Link href={process.env.REACT_APP_BACKEND_URL + machines[0].Opis.full_description.url}
                                  target="_blank"
                                  external
                            >
                                Zobacz pełny opis
                            </Link>
                            }
                        </Block>
                    </Block>
                );
            }}
        </Query>
    )
}
