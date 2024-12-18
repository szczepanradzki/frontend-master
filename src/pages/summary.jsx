import React, { useContext, useState, useEffect, createContext, useReducer } from "react";
import { TopBar } from "../components/topbar";
import { Block, BlockTitle, Page } from "framework7-react";
import { OfferSummary } from "../views/summary-offer";
import { AddonsSummary } from "../views/offfer-addons-summary";
import { ReactPdf } from "../pdf/react-pdf";
import { QueriesMap } from "../graphql/queries-map";
import { apolloClient } from "../utils/apolloClient";
import { getServices } from "../graphql/additions-services";
import { offerHandler } from "../utils/offer-handler";
import { PdfCreator } from "../components/blob-provider";
import { SendOfferPopup } from "../views/send-offer-popup";
import { OfferActions } from "../components/offer-actions";
import { summaryOffer } from "../js/reducer";
import { ComposeOffer, SummaryContext } from "../js/contexts";
import { SavingOfferPopup } from "../views/savingOfferPopup";
import { initialEmail, initialState } from "../js/initialPdfTexts";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function Summary(props) {
    const offerId = props.id.replace(/-/g, "/");
    const {state, dispatch} = useContext(ComposeOffer);
    const [stateSummary, dispatchSummary] = useReducer(summaryOffer, {});
    const [popupOpen, setPopupOpen] = useState(false);
    const [isOfferSaved, setIsOfferSaved] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [pdfTimeout, setPdfTimeout] = useState(true);
    const [servicesFlag, setServicesFlag] = useState(null);
    const [parts, setParts] = useState([]);
    const [services, setServices] = useState([]);
    const [elements, setElements] = useState([]);
    const [content, setContent] = useState([]);
    const [servicesContent, setServicesContent] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [fullDocsArr, setFullDocsArr] = useState([]);
    const [PDF, setPDF] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [detailed, setDetailed] = useState(true);
    const [fullSpecs, setFullSpecs] = useState(false);
    const salesman = {
        name: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("userEmail"),
        phone: sessionStorage.getItem("userPhone")
    };
    const handler = new offerHandler({offerId, stateSummary, totalCost, state, customOffer: true});

    useEffect(() => {
        let summaryPrices = 0;
        summaryPrices += state["services"] ? +state["services"].price : 0;
        summaryPrices += state["addedPrice"] ? +state["addedPrice"].price : 0;
        summaryPrices += (state["discountedValue"] && state["discountedValue"].price > 0) ?
            +state["machineCost"].price - +state["discountedValue"].price : +state["machineCost"].price;
        setTotalCost(summaryPrices);
    }, []);

    useEffect(() => {
        apolloClient.query({query: getServices}).then(response => setServicesData(response.data["services"]));
    }, []);

    useEffect(() => {
        dispatchSummary({type: "CHANGE", payload: {name: "editedFields", value: initialState}});
        dispatchSummary({type: "CHANGE", payload: {name: "personalizedEmail", value: initialEmail}});
    }, []);

    useEffect(() => {
        if(isOfferSaved) {
            setIsOfferSaved(false);
        }
    }, [isOfferSaved]);

    useEffect(() => {
        const elements = [];
        QueriesMap.filter(element => {
            if(state.hasOwnProperty(element.content) && !!state[element.content].value) {
                elements.push({...element, id: state[element.content].value});
            }
        });
        setElements(elements);
    }, []);

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
        elementsMap();
    }, [elements]);

    useEffect(() => {
        takenServices();
    }, [servicesData]);

    useEffect(() => {
        if(parts.length > 0 && servicesFlag && services.length > 0) {
            setContent(parts);
            setServicesContent(services);
        }
        if(parts.length > 0 && !servicesFlag && services.length === 0) {
            setContent(parts);
        }
    }, [parts, services]);

    useEffect(() => {
        if(content.length > 0) {
            generatePDF().then((resp) => setPDF(resp));
        }
    }, [stateSummary.client]);

    useEffect(() => {
        if(isOfferSaved) {
            setIsOfferSaved(false);
        }
    }, [isOfferSaved]);

    const elementsMap = () => {
        if(elements.length > 0) {
            const items = elements.map(element => {
                const splittedElements = element.id.split("; ");
                return splittedElements.map((item) => ({
                        query: element.query,
                        requested: element.key,
                        name: item
                    }
                ));
            }).flat();
            setBasicParts(items);
        }
    };

    const setBasicParts = async (items) => {
        const fullSpecsUrls = [];
        const pArray = items.map(async value => {
            const request = await apolloClient.query({query: value.query, variables: {name: value.name}});
            const data = await request.data[value.requested][0];
            (data.Opis && data.Opis.full_description) &&
            fullSpecsUrls.push({
                name: data.name,
                url: data["Opis"].full_description.url
            });
            return {name: data.name, description: data.Opis && data.Opis.short_description, price: data.price || 0, qty: 1};
        });
        const parts = await Promise.all(pArray);
        setFullDocsArr(fullSpecsUrls);
        setParts(parts);
    };

    const getQtys = () => {
        const splittedServices = state.services && state.services.value.split("; ");
        if(splittedServices) {
            return splittedServices.map(service => {
                const startIndex = service.indexOf("{");
                const endIndex = service.indexOf("}");
                const amount = +service.substring(startIndex + 1, endIndex);
                return {name: service, qty: amount || null};
            });
        }
    };

    const takenServices = () => {
        if(servicesData.length > 0) {
            const arr = [];
            const allServices = servicesData.map(service => service);
            const selectedServices = getQtys() && getQtys().map(service => service);
            if(allServices && selectedServices) {
                allServices.forEach(service => selectedServices.forEach(selected => {
                    const fuIndex = selected.name.indexOf("{");
                    const getName = selected.name.substring(0, fuIndex !== -1 ? fuIndex - 1 : selected.name.length);
                    if(getName === service.name) {
                        arr.push({name: service.name, description: service.Opis ? service.Opis : "", price: service.price || 0, qty: selected.qty});
                    }
                }));
            }
            setServices(arr);
            arr.length > 0 ? setServicesFlag(true) : setServicesFlag(false);
        }
    };

    const generatePDF = async () => {
        const generated = <ReactPdf comment={state.comment.value}
                                    machineCost={state["machineCost"].price}
                                    addedPrice={state["addedPrice"].price}
                                    discount={state["discount"].price}
                                    discountValue={state["discountedValue"].price}
                                    total={totalCost}
                                    offerNo={await handler.setOfferNo()}
                                    client={stateSummary.client}
                                    user={salesman}
                                    content={content}
                                    services={servicesContent}
                                    detailed={detailed}
                                    coverLetter={stateSummary.editedFields.coverLetter}
                                    offerTerms={stateSummary.editedFields.customOfferTerms}
        />;
        return generated;
    };

    const closeOffer = () => {
        setPdfTimeout(true);
        if(isConfirmed) {
            props.$f7router.clearPreviousHistory();
            dispatch({type: "CLEAR"});
            props.$f7router.navigate("/dashboard/");
        } else {
            if(window.confirm("Czy naprawdę chcesz wyjść bez zapisywania?")) {
                props.$f7router.clearPreviousHistory();
                dispatch({type: "CLEAR"});
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
                <BlockTitle large>Podsumowanie oferty</BlockTitle>
                <OfferSummary/>
                <BlockTitle large>Wybrane opcje dodatkowe</BlockTitle>
                <AddonsSummary/>
                <Block className="row justify-content-flex-end">
                    <div className="margin-right"><p>Całkowita wartość zamówienia</p></div>
                    <div><p>{numbersWithSpaces((+totalCost).toFixed(2))} EUR/netto</p></div>
                </Block>
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
                                setDetailedPdf={(e) => setDetailed(e)}
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
                                state,
                                totalCost,
                                customOffer: true
                            }}
                />
                }
            </Page>
        </SummaryContext.Provider>
    );
}
