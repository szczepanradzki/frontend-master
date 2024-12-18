import React from "react";
import {Block, List} from "framework7-react";
import {fullMachineQuery} from "../graphql/machines";
import {Query} from "../js/query";
import {AccordionItem} from "./accordion";

export function MachinesAccordion({selectedMachine}) {
    return (
        <Block className="offer__accordion">
            <Query query={fullMachineQuery}>
                {({data: {machines}}) =>
                    <List mediaList
                          noHairlines
                          className="list__selectBox"
                    >
                        {machines.map(machine =>
                            <AccordionItem key={machine.id}
                                           title={machine.name}
                                           price={machine.price}
                                           buttonText="Wybierz"
                                           contentText={machine.Opis && machine.Opis.short_description}
                                           pdf={machine.Opis.full_description && machine.Opis.full_description.url}
                                           buttonFunc={() => selectedMachine(machine)}
                            />
                        )}
                    </List>
                }
            </Query>
        </Block>
    );
}
