import React, {useContext} from "react";
import {Page, BlockTitle, Block, BlockHeader} from "framework7-react";
import {TopBar} from "../components/topbar";
import {MachinesAccordion} from "../components/machines-accordion";
import {ComposeOffer} from "../js/contexts";

export function ChooseMachine(props) {
    const {dispatch} = useContext(ComposeOffer);
    const showMachineDetails = (machine) => {
        dispatch({type: "CHANGE", payload: {key: "machines", value: machine.name, price: machine.price}});
        props.$f7router.navigate(`/${props.redirectTo}/${machine.name}/`);
    };
    return (
        <Page>
            <TopBar router={props.$f7router}/>
            <BlockTitle large>Lista maszyn</BlockTitle>
            <Block className="offer__headers">
                <BlockHeader>Model</BlockHeader>
                <BlockHeader>Cena</BlockHeader>
            </Block>
            <MachinesAccordion selectedMachine={(machine) => showMachineDetails(machine)}/>
        </Page>
    );
}
