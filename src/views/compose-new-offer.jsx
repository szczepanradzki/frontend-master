import React, { Fragment, useEffect, useContext } from 'react';
import { Block, Page, Button } from 'framework7-react';
import { TopBar } from '../components/topbar';
import { MachineHeader } from '../components/machine-header';
import { ComposeOffer } from '../js/contexts';
import { fullMachineSpec } from '../graphql/full-machine';
import { useQuery } from '@apollo/react-hooks';
import { QueriesMap } from '../graphql/queries-map';
import { Select } from '../components/select';
import { MultiSelect } from '../components/multiSelect';

export function ComposeNewOffer(props) {
    const {state, dispatch} = useContext(ComposeOffer);
    const {loading, error, data} = useQuery(fullMachineSpec, {
        variables: {name: props.id}
    });

    const queries = QueriesMap.map(query => {
        return {
            name: query.name,
            content: query.content
        };
    });
    useEffect(() => {
        if(data) {
            dispatch({type: 'CHANGE', payload: {key: 'machines', value: data.machines[0].name, price: data.machines[0].price}});
        }
    }, [data]);
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
        props.$f7router.navigate(`/new-offer/${props.id}/2/`);
    };

    return (
        <Page>
            <TopBar router={props.$f7router}/>
            <MachineHeader id={props.id}/>
            {loading && <p>...Loading</p>}
            {error && <p>Error: {error}</p>}
            {data &&
            Object.keys(data).map(element => {
                return queries.map(resp => {
                    if(data[element]) {
                        return data[element].map(item => {
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
                                                defaultItem={item[resp.content].filter(item => item.default)}
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
                                                    return (
                                                        <MultiSelect key={parts.name}
                                                                     data={parts['opcje_softwares']}
                                                                     respAttribute={'opcje_softwares'}
                                                                     placeholder={'Opcje Software'}
                                                                     defaultItem={[]}
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
                                                    return (
                                                        <Select key={parts.name}
                                                                data={parts['opcje_do_stolows']}
                                                                respAttribute={'opcje_do_stolows'}
                                                                placeholder={'Opcje do stołu'}
                                                                defaultItem={[]}
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
