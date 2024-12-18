import React, { Fragment, useEffect, useReducer, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Page, BlockTitle, Link } from "framework7-react";
import { TopBar } from "../components/topbar";
import { MachineHeader } from "../components/machine-header";
import { fullMachineSpec } from "../graphql/full-machine";
import { Table } from "../components/table";
import { QueriesMap } from "../graphql/queries-map";
import { ReactPdf } from "../pdf/react-pdf";
import * as _ from "underscore";
import { offerHandler } from "../utils/offer-handler";
import { PdfCreator } from "../components/blob-provider";
import { SendOfferPopup } from "./send-offer-popup";
import { OfferActions } from "../components/offer-actions";
import { SummaryContext } from "../js/contexts";
import { summaryOffer } from "../js/reducer";
import { SavingOfferPopup } from "./savingOfferPopup";
import { initialEmail, initialState } from "../js/initialPdfTexts";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function MachineGlobalOffer(props) {
    const {loading, error, data} = useQuery(fullMachineSpec, {variables: {name: props.id}});
    const [stateSummary, dispatchSummary] = useReducer(summaryOffer, {});
    const offerId = props.id.replace(/-/g, "/");
    const [isOfferSaved, setIsOfferSaved] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [pdfTimeout, setPdfTimeout] = useState(true);
    const [parts, setParts] = useState([]);
    const [content, setContent] = useState([]);
    const [fullDocsArr, setFullDocsArr] = useState([]);
    const [PDF, setPDF] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [detailed, setDetailed] = useState(true);
    const [fullSpecs, setFullSpecs] = useState(false);
    const salesman = {
        name: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("userEmail"),
        phone: sessionStorage.getItem("userPhone")
    };

    const queries = QueriesMap.map(query => {
        return {
            name: query.name,
            content: query.content
        };
    });

    const handler = new offerHandler({offerId, stateSummary, state: data, customOffer: false});

    useEffect(() => {
        dispatchSummary({type: "CHANGE", payload: {name: "editedFields", value: initialState}});
        dispatchSummary({type: "CHANGE", payload: {name: "personalizedEmail", value: initialEmail}});
    }, []);

    useEffect(() => {
        if(data) {
            const elements = data.machines[0];
            const arr = [];
            const fullSpecsUrls = [];
            let price = 0;
            queries.map(resp =>
                Object.keys(elements).map(item => {
                    if(_.findWhere(arr, {
                        name: elements["name"],
                        description: elements["Opis"] && elements["Opis"].short_description,
                        price: elements.price,
                        qty: 1
                    }) == null) {
                        arr.push({
                            name: elements["name"],
                            description: elements["Opis"] && elements["Opis"].short_description,
                            price: elements.price || 0,
                            qty: 1
                        });
                        (elements["Opis"] && elements["Opis"].full_description) &&
                        fullSpecsUrls.push({
                            name: elements.name,
                            url: elements["Opis"].full_description.url
                        });
                        price += elements.price || 0;
                    }
                    if(resp.content === item) {
                        elements[item].map(element => {
                            if(_.findWhere(arr, {
                                name: element["name"],
                                description: element["Opis"] && element["Opis"].short_description,
                                qty: 1,
                                price: element.price
                            }) == null) {
                                arr.push({
                                    name: element["name"],
                                    description: element["Opis"] && element["Opis"].short_description,
                                    price: element.price || 0,
                                    qty: 1
                                });
                                (element["Opis"] && element["Opis"].full_description) &&
                                fullSpecsUrls.push({
                                    name: element.name,
                                    url: element["Opis"].full_description.url
                                });
                                price += element.price || 0;
                                if(element["opcje_softwares"]) {
                                    element["opcje_softwares"].map(option => {
                                        arr.push({
                                            name: option["name"],
                                            description: option["Opis"] && option["Opis"].short_description,
                                            price: option.price || 0,
                                            qty: 1
                                        });
                                        (option["Opis"] && option["Opis"].full_description) &&
                                        fullSpecsUrls.push({
                                            name: option.name,
                                            url: option["Opis"].full_description.url
                                        });
                                        price += option.price || 0;
                                    });
                                }
                                if(element["opcje_do_stolows"]) {
                                    element["opcje_do_stolows"].map(option => {
                                        arr.push({
                                            name: option["name"],
                                            description: option["Opis"] && option["Opis"].short_description,
                                            price: option.price || 0,
                                            qty: 1
                                        });
                                        (option["Opis"] && option["Opis"].full_description) &&
                                        fullSpecsUrls.push({
                                            name: option.name,
                                            url: option["Opis"].full_description.url
                                        });
                                        price += option.price || 0;
                                    });
                                }
                            }

                        });
                    }
                })
            );
            setFullDocsArr(fullSpecsUrls);
            setTotalCost(price);
            setParts(arr);

        }
    }, [data]);

    useEffect(() => {
        if(fullSpecs) {
            const filteredDocsArray = fullDocsArr.filter(item => item);
            dispatchSummary({type: "CHANGE", payload: {name: "fullSpecs", value: filteredDocsArray}});
        } else {
            dispatchSummary({type: "CHANGE", payload: {name: "fullSpecs", value: []}});
        }
    }, [fullSpecs]);

    useEffect(() => {
        if(content.length > 0 && pdfTimeout) {
            setPdfTimeout(false);
        }
    }, [PDF]);

    useEffect(() => {
        if(content.length > 0) {
            generatePDF().then((resp) => setPDF(resp));
        }
    }, [stateSummary.client]);

    useEffect(() => {
        if(parts.length > 0) {
            setContent(parts);
        }
    }, [parts]);

    useEffect(() => {
        if(isOfferSaved) {
            setIsOfferSaved(false);
        }
    }, [isOfferSaved]);

    const generatePDF = async () => {
        const generated = <ReactPdf comment=""
                                    machineCost={0}
                                    addedPrice={0}
                                    discount={0}
                                    discountValue={0}
                                    total={0}
                                    offerNo={await handler.setOfferNo()}
                                    client={stateSummary.client}
                                    user={salesman}
                                    content={content}
                                    services={[]}
                                    detailed={detailed}
                                    coverLetter={stateSummary.editedFields.coverLetter}
                                    offerTerms={stateSummary.editedFields.customOfferTerms}
        />;
        return generated;
    };

    const closeOffer = () => {
        if(isConfirmed) {
            props.$f7router.clearPreviousHistory();
            props.$f7router.navigate("/dashboard/");
        } else {
            if(window.confirm("Czy naprawdę chcesz wyjść bez zapisywania?")) {
                props.$f7router.clearPreviousHistory();
                props.$f7router.navigate("/dashboard/");
            }
        }
    };

    const saveOffer = () => {
        dispatchSummary({type: "CHANGE", payload: {name: "client", value: false}});
        setIsSaving(true);
    };

    return (
        <SummaryContext.Provider value={{stateSummary, dispatchSummary}}>
            <Page>
                <TopBar router={props.$f7router}/>
                <MachineHeader id={props.id}/>
                {loading && <p>...Loading</p>}
                {error && <p>Error: {error}</p>}
                {data &&
                Object.keys(data).map(element => {
                    const tables = queries.map(resp => {
                        if(resp.content === element) {
                            return (
                                <Table key={element} title={resp.name}>
                                    <tr>
                                        <td>{data[element][0].name}</td>
                                        <td>{data[element][0].Opis.short_description} {(data[element][0].Opis && data[element][0].Opis.full_description) &&
                                        <Link href={`${process.env.REACT_APP_BACKEND_URL}${data[element][0].Opis.full_description.url}`}
                                              target="_blank"
                                              external
                                        >
                                            Zobacz pełny opis
                                        </Link>
                                        }
                                        </td>
                                        <td>{numbersWithSpaces(data[element][0].price)}</td>
                                    </tr>
                                </Table>
                            );
                        }
                        if(data[element]) {
                            return data[element].map(item => {
                                if(item[resp.content] && item[resp.content].length > 0) {
                                    return (
                                        <Table key={Math.random()} title={resp.name}>
                                            {item[resp.content].map(parts => {
                                                    return (
                                                        <Fragment>
                                                            <tr key={parts.id}>
                                                                <td>{parts.name}</td>
                                                                <td>{parts.Opis && parts.Opis.short_description} {(parts.Opis && parts.Opis.full_description) &&
                                                                <Link href={`${process.env.REACT_APP_BACKEND_URL}${parts.Opis.full_description.url}`}
                                                                      target="_blank"
                                                                      external
                                                                >
                                                                    Zobacz pełny opis
                                                                </Link>
                                                                }
                                                                </td>
                                                                <td>{numbersWithSpaces(parts.price) || "Wliczone"}</td>
                                                            </tr>
                                                            {(parts["opcje_softwares"] && parts["opcje_softwares"].length > 0) &&
                                                            <Fragment>
                                                                <tr>
                                                                    <td colSpan={3}>
                                                                        <BlockTitle className="table__title--small">
                                                                            <strong>Opcje do powyższego sterownika</strong>
                                                                        </BlockTitle>
                                                                    </td>
                                                                </tr>
                                                                {parts["opcje_softwares"].map((opt, index) =>
                                                                    <tr key={opt.id}
                                                                        className={(index === parts["opcje_softwares"].length - 1) ? "last-item" : ""}
                                                                    >
                                                                        <td>{opt.name}</td>
                                                                        <td>{opt.Opis && opt.Opis.short_description} {(opt.Opis && opt.Opis.full_description) &&
                                                                        <Link href={`${process.env.REACT_APP_BACKEND_URL}${opt.Opis.full_description.url}`}
                                                                              target="_blank"
                                                                              external
                                                                        >
                                                                            Zobacz pełny opis
                                                                        </Link>
                                                                        }
                                                                        </td>
                                                                        <td>{numbersWithSpaces(opt.price) || "Wliczone"}</td>
                                                                    </tr>
                                                                )}
                                                            </Fragment>
                                                            }
                                                            {(parts["opcje_do_stolows"] && parts["opcje_do_stolows"].length > 0) &&
                                                            <Fragment>
                                                                <tr>
                                                                    <td colSpan={3}>
                                                                        <BlockTitle className="table__title--small">
                                                                            <strong>Opcje do powyższego stołu</strong>
                                                                        </BlockTitle>
                                                                    </td>
                                                                </tr>
                                                                {parts["opcje_do_stolows"].map((opt, index) =>
                                                                    <tr className={(index === parts["opcje_do_stolows"].length - 1) ? "last-item" : ""}>
                                                                        <td>{opt.name}</td>
                                                                        <td>{opt.Opis && opt.Opis.short_description} {(opt.Opis && opt.Opis.full_description) &&
                                                                        <Link href={`${process.env.REACT_APP_BACKEND_URL}${opt.Opis.full_description.url}`}
                                                                              target="_blank"
                                                                              external
                                                                        >
                                                                            Zobacz pełny opis
                                                                        </Link>
                                                                        }
                                                                        </td>
                                                                        <td>{numbersWithSpaces(opt.price) || "Wliczone"}</td>
                                                                    </tr>
                                                                )}
                                                            </Fragment>
                                                            }
                                                        </Fragment>
                                                    );
                                                }
                                            )}
                                        </Table>
                                    );
                                }
                            });
                        }
                    });
                    return tables;
                })}

                <OfferActions setPopupOpen={(e) => setPopupOpen(e)}
                              closeOffer={() => closeOffer()}
                              saveOffer={() => saveOffer()}
                />

                <SendOfferPopup popupOpen={popupOpen}
                                setPopupOpen={() => {
                                    setPopupOpen(false);
                                    setPdfTimeout(true);
                                }}
                                getBack={() => setPdfTimeout(true)}
                                saving={(e) => setIsSaving(e)}
                                setDetailedPdf={(e) => {setDetailed(e)}}
                                setFullSpecs={(e) => setFullSpecs(e)}
                />
                <SavingOfferPopup popupOpen={isSaving}
                                  saving={isOfferSaved}
                                  setPopupOpen={(e) => setIsSaving(e)}
                />
                {!pdfTimeout &&
                <PdfCreator PDF={PDF}
                            response={(resp) => {
                                setPdfTimeout(resp);
                                setIsOfferSaved(resp);
                                setIsConfirmed(resp);
                            }}
                            details={{
                                offerId,
                                stateSummary,
                                state: data,
                                customOffer: false
                            }}
                />
                }
            </Page>
        </SummaryContext.Provider>
    );
}
