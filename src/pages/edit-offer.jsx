import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Block, Page, Button, BlockTitle } from 'framework7-react';
import { TopBar } from '../components/topbar';
import { MachineHeader } from '../components/machine-header';
import { ComposeOffer } from '../js/contexts';
import { fullMachineSpec } from '../graphql/full-machine';
import { useQuery } from '@apollo/react-hooks';
import { QueriesMap } from '../graphql/queries-map';
import { Select } from '../components/select';
import { getSingleOffer } from '../graphql/single-offer';
import { MultiSelect } from '../components/multiSelect';

export function EditOffer(props) {
    const {state, dispatch} = useContext(ComposeOffer);
    const offerNo = props.id.replace(/-/g, '/');
    const [machine, setMachine] = useState(null);

    const queryMultiple = () => {
        const res1 = useQuery(getSingleOffer, {variables: {offerNo: offerNo || null}});
        const res2 = useQuery(fullMachineSpec, {variables: {name: machine && machine.name}});
        return [res1, res2];
    };

    const [
        {loading: loading1, error: error1, data: data1},
        {loading: loading2, error: error2, data: data2}
    ] = queryMultiple();

    useEffect(() => {
        if(data1) {
            setMachine({name: data1.oferties[0].maszyna});
        }
    }, [loading1, error1, data1]);

    useEffect(() => {
        if(data2) {
            const machine = data2.machines[0];
            machine && dispatch({type: 'CHANGE', payload: {key: 'machines', value: machine.name, price: machine.price}});
        }
    }, [data2, machine]);

    const queries = QueriesMap.map(query => {
        return {
            name: query.name,
            content: query.content,
            offer: query.savedOffer
        };
    });

    const handleCheckboxes = (e) => {
        const blums = e['blums'];
        const metrols = e['metrols'];
        const renishaws = e['renishaws'];
        if(Object.keys(blums).length > 0) {
            let probeTotalPrice = 0;
            const probesName = [];
            const selectedProbe = Object.keys(blums).map(item => {
                if(blums[item].bool) {
                    return {value: item, price: +blums[item].price};
                }
            });
            selectedProbe.map(probe => {
                if(probe) {
                    probesName.push(probe.value);
                    probeTotalPrice += probe.price ? probe.price : 0;
                }
            });
            dispatch({type: 'CHANGE', payload: {key: 'blums', value: probesName.join('; '), price: probeTotalPrice}});
        }
        if(Object.keys(metrols).length > 0) {
            let probeTotalPrice = 0;
            const probesName = [];
            const selectedProbe = Object.keys(metrols).map(item => {
                if(metrols[item].bool) {
                    return {value: item, price: +metrols[item].price};
                }
            });
            selectedProbe.map(probe => {
                if(probe) {
                    probesName.push(probe.value);
                    probeTotalPrice += probe.price ? probe.price : 0;
                }
            });
            dispatch({type: 'CHANGE', payload: {key: 'metrols', value: probesName.join('; '), price: probeTotalPrice}});
        }
        if(Object.keys(renishaws).length > 0) {
            let probeTotalPrice = 0;
            const probesName = [];
            const selectedProbe = Object.keys(renishaws).map(item => {
                if(renishaws[item].bool) {
                    return {value: item, price: +renishaws[item].price};
                }
            });
            selectedProbe.map(probe => {
                if(probe) {
                    probesName.push(probe.value);
                    probeTotalPrice += probe.price ? probe.price : 0;
                }
            });
            dispatch({type: 'CHANGE', payload: {key: 'renishaws', value: probesName.join('; '), price: probeTotalPrice}});
        }
    };

    const nextStep = () => {
        props.$f7router.navigate(`/edit-offer/${props.id}/2/`);
    };

    const setDefaultOption = (element, data) => {
        const splitted = element.split('; ');
        const filtered = data.filter(item => splitted.includes(item.name));
        return filtered;
    };

    return (
        <Page>
            <TopBar router={props.$f7router}/>
            <BlockTitle>Edytujesz ofertę nr: {offerNo}</BlockTitle>
            {machine &&
            <MachineHeader id={machine.name}/>
            }
            {loading2 && <p>...Loading</p>}
            {error2 && <p>Error: {error2}</p>}
            {(data1 && data2) &&
            Object.keys(data2).map(element => {
                return queries.map(resp => {
                    if(data2[element]) {
                        return data2[element].map(item => {
                            if(item[resp.content] && item[resp.content].length > 0) {
                                return (
                                    <Fragment key={item.id}>
                                        <Select data={item[resp.content]}
                                                respAttribute={resp.content}
                                                placeholder={resp.name}
                                                checkboxes={
                                                    resp.content === 'renishaws' ||
                                                    resp.content === 'metrols' ||
                                                    resp.content === 'blums'
                                                }
                                                defaultItem={setDefaultOption(data1.oferties[0][resp.offer], item[resp.content])}
                                                getProbes={(e) => {
                                                    handleCheckboxes(e);
                                                }}
                                        />
                                        {state['controllers'] &&
                                        item[resp.content].map(parts => {
                                                if(parts['opcje_softwares'] &&
                                                    parts['opcje_softwares'].length > 0 &&
                                                    state['controllers'].value === parts.name
                                                ) {
                                                    const filtered = setDefaultOption(data1.oferties[0].software, parts['opcje_softwares']);
                                                    return (
                                                        <MultiSelect key={parts['opcje_softwares'].id}
                                                                     data={parts['opcje_softwares']}
                                                                     respAttribute={'opcje_softwares'}
                                                                     placeholder={'Opcje software'}
                                                                     defaultItem={filtered}
                                                        />
                                                    );
                                                }
                                            }
                                        )}
                                        {state['tables'] &&
                                        item[resp.content].map(parts => {
                                                if(parts['opcje_do_stolows'] &&
                                                    parts['opcje_do_stolows'].length > 0 &&
                                                    state['tables'].value === parts.name
                                                ) {
                                                    const filtered = setDefaultOption(data1.oferties[0].opcje_do_stolow, parts['opcje_do_stolows']);
                                                    return (
                                                        <Select key={parts['opcje_do_stolows'].id}
                                                                data={parts['opcje_do_stolows']}
                                                                respAttribute={'opcje_do_stolows'}
                                                                placeholder={'Opcje do stołu'}
                                                                defaultItem={filtered}
                                                        />
                                                    );
                                                }
                                            }
                                        )}
                                    </Fragment>
                                );
                            }
                        });
                    }
                });
            })}
            <Block>
                <Button onClick={() => nextStep()}>Next</Button>
            </Block>
        </Page>
    );
};
