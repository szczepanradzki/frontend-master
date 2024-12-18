import React from 'react';
import axios from 'axios';
import { getOffers } from '../graphql/oferty';
import { apolloClient } from './apolloClient';
import moment from 'moment';
import { Auth } from '../js/auth';
import { PDFDocument } from 'pdf-lib';

export class offerHandler {
    constructor(props) {
        this.auth = new Auth();
        this.props = props;
        this.token = this.auth.getToken;
        this.salesman = {
            name: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('userEmail'),
            phone: sessionStorage.getItem('userPhone')
        };
        this.data = {
            yyyy: moment().year(),
            mm: `0${moment().month() + 1}`.slice(-2)
        };
        this.initials = `${this.salesman.name.substring(0, 1)}${this.salesman.name.substr(this.salesman.name.indexOf(' ') + 1, 3)}`;
    }

    async getOfferties() {
        const request = await apolloClient.query({fetchPolicy: 'network-only', query: getOffers, variables: {salesman: this.salesman.name}});
        const response = await request.data.oferties;
        return response;
    }

    async getId() {
        const offerRegexp = new RegExp(`${this.initials}/${this.data.yyyy}/${this.data.mm}/`, 'g');
        const allOffers = await this.getOfferties();
        const salesmanOffers = allOffers.filter(offer => offer.nr_oferty.match(offerRegexp));
        const sortedOffers = salesmanOffers.sort((a, b) => {
            return a.nr_oferty > b.nr_oferty ? -1 : 1;
        });
        const searchedOffer = sortedOffers.length > 0 ? sortedOffers[0].nr_oferty : null;
        return searchedOffer ? +searchedOffer.substring(13, searchedOffer.lastIndexOf('/')) : 0;
    };

    async setOfferNo() {
        if(this.props.offerId.indexOf('/') !== -1) {
            const offerParams = {
                initials: this.props.offerId.substring(0, 4),
                offerMonth: this.props.offerId.substring(10, 12),
                offerYear: this.props.offerId.substring(5, 9),
                id: this.props.offerId.substring(13, this.props.offerId.lastIndexOf('/'))
            };
            const {initials, offerYear, offerMonth, id} = offerParams;
            const regex = `${initials}/${offerYear}/${offerMonth}/${id}/`;
            const offers = await this.getOfferties();
            const filteredOffers = offers.filter(item => {
                    if(item['nr_oferty'].match(regex)) {
                        return item;
                    }
                }
            );
            const getVersion = filteredOffers[0].nr_oferty.substr(this.props.offerId.lastIndexOf('/') + 1);
            const currentVersion = +getVersion === 0 ? 1 : +getVersion + 1;
            return `${initials}/${offerYear}/${offerMonth}/${id}/${currentVersion < 100 ? `0${currentVersion}`.slice(-2) : currentVersion}`;
        } else {
            const getId = await this.getId();
            const id = getId === 0 ? 1 : getId + 1;
            return `${this.initials}/${this.data.yyyy}/${this.data.mm}/${id < 100 ? `0${id}`.slice(-2) : id}/01`;
        }
    }

    getSoftwareOptions() {
        return this.props.state.machines[0].controllers.map(item =>
            item.opcje_softwares.map(item => item.name)
        );
    };

    getTablesOptions() {
        return this.props.state.machines[0].tables.map(table =>
            table.opcje_do_stolows.map(item => item.name)
        );
    };

    async saveOffer(file) {
        const formData = new FormData();
        const data = {
            nr_oferty: await this.setOfferNo(),
            klient: this.props.stateSummary.client.name,
            clientEmail: this.props.stateSummary.client.email,
            maszyna: this.props.customOffer ? this.props.state['machines'] ? this.props.state['machines'].value : '' : this.props.state.machines[0].name,
            automatyzacja: this.props.customOffer ?
                this.props.state['automatyzacjas'] ? this.props.state['automatyzacjas'].value : '' :
                this.props.state.machines[0].automatyzacjas.map(item => item.name).join('; '),
            blum: this.props.customOffer ?
                this.props.state['blums'] ? this.props.state['blums'].value : '' :
                this.props.state.machines[0].blums.map(item => item.name).join('; '),
            sterownik: this.props.customOffer ?
                this.props.state['controllers'] ? this.props.state['controllers'].value : '' :
                this.props.state.machines[0].controllers.map(item => item.name).join('; '),
            software: this.props.customOffer ?
                this.props.state['opcje_softwares'] ? this.props.state['opcje_softwares'].value : '' :
                this.getSoftwareOptions().join('; '),
            metrol: this.props.customOffer ?
                this.props.state['metrols'] ? this.props.state['metrols'].value : '' :
                this.props.state.machines[0].metrols.map(item => item.name).join('; '),
            renishaw: this.props.customOffer ?
                this.props.state['renishaws'] ? this.props.state['renishaws'].value : '' :
                this.props.state.machines[0].renishaws.map(item => item.name).join('; '),
            uslugi: this.props.customOffer ? this.props.state['services'] ? this.props.state['services'].value : '' : '',
            sprzedawca: this.salesman.name,
            wiory: this.props.customOffer ?
                this.props.state['wiories'] ? this.props.state['wiories'].value : '' :
                this.props.state.machines[0].wiories.map(item => item.name).join('; '),
            wrzeciona: this.props.customOffer ?
                this.props.state['wrzecionas'] ? this.props.state['wrzecionas'].value : '' :
                this.props.state.machines[0].wrzecionas.map(item => item.name).join('; '),
            wysokosc_adv: this.props.customOffer ?
                this.props.state['column_height_advs'] ? this.props.state['column_height_advs'].value : '' :
                this.props.state.machines[0].column_height_advs && this.props.state.machines[0].column_height_advs.map(item => item.name).join('; '),
            wysokosc_standard: this.props.customOffer ?
                this.props.state['wysokosc_kolumny_standards'] ? this.props.state['wysokosc_kolumny_standards'].value : '' :
                this.props.state.machines[0].wysokosc_kolumny_standards && this.props.state.machines[0].wysokosc_kolumny_standards.map(item => item.name).join('; '),
            komentarz: this.props.customOffer ? this.props.state['comment'] ? this.props.state['comment'].value : '' : '',
            opcje_do_stolow: this.props.customOffer ?
                this.props.state['opcje_do_stolows'] ? this.props.state['opcje_do_stolows'].value : '' :
                this.getTablesOptions().join('; '),
            stol: this.props.customOffer ?
                this.props.state['tables'] ? this.props.state['tables'].value : '' :
                this.props.state.machines[0].tables.map(item => item.name).join('; '),
            pozostale: this.props.customOffer ?
                this.props.state['pozostales'] ? this.props.state['pozostales'].value : '' :
                this.props.state.machines[0].pozostales.map(item => item.name).join('; '),
            additionalPrice: this.props.customOffer ? this.props.state['addedPrice'] ? this.props.state['addedPrice'].price : 0 : 0,
            Suma: this.props.customOffer ? this.props.totalCost ? this.props.totalCost : 0 : 0,
            discount: this.props.customOffer ? this.props.state['discount'] ? this.props.state['discount'].price : 0 : 0,
            custom_offer: this.props.customOffer,
            pdf: file
        };

        const newData = {};
        Object.keys(data).map(item => {
            if(item === 'pdf') {
                formData.append(`files.${item}`, data['pdf'], file.name);
            } else {
                newData[item] = data[item];
            }
        });

        formData.append('data', JSON.stringify(newData));
        const request = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/oferties`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });

        if(request.status === 200) {
            if(this.props.stateSummary.send) {
                this.sendOffer(file);
            }
            return true;
        } else {
            alert('Wystąpił nieoczekiwany wyjątek. Jeśli problem będzie się powtarzał proszę o kontakt z administratorem');
            return false;
        }
    };

    fileToBase64(file) {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result.replace(/^data:.+;base64,/, ''));
            };
            reader.readAsDataURL(file);
        });
    };

    async createAttachments(array) {
        const attachmentsArray = array.length > 0 ? array.map(async attach => {
                const url = `${process.env.REACT_APP_BACKEND_URL}${attach.url}`;
                const getBlob = await axios.get(url, {
                    responseType: 'blob'
                });
                const response = await getBlob.data;
                const file = await new File([response], `${attach.name}.pdf`, {type: response.type});
                return file;
            }) :
            [];
        return await Promise.all(attachmentsArray);
    }

    async additionalAttachments() {
        const {additionalAttachments} = this.props.stateSummary;
        const getFiles = await this.createAttachments(additionalAttachments);
        const getConvertedArray = getFiles.map(async file => {
            const converted = await this.fileToBase64(file);
            return {
                filename: `${file.name}`,
                content: converted,
                encoding: 'base64'
            };
        });
        const attachments = await Promise.all(getConvertedArray);
        return attachments;
    };

    async mergePDFDocuments() {
        const {fullSpecs} = this.props.stateSummary;
        if(fullSpecs.length > 0) {
            const mergedPdf = await PDFDocument.create();
            for(let document of fullSpecs) {
                const pdfRequest = await fetch(`${process.env.REACT_APP_BACKEND_URL}${document.url}`);
                const response = await pdfRequest.arrayBuffer();
                document = await PDFDocument.load(response);
                const copiedPages = await mergedPdf.copyPages(document, document.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const savedPdf = await mergedPdf.saveAsBase64();
            return {
                filename: 'Opis techniczny.pdf',
                content: savedPdf,
                encoding: 'base64'
            };
        } else {
            return "";
        }
    }

    async sendOffer(file) {
        const {fullSpecs} = this.props.stateSummary;
        this.fileToBase64(file).then(async resp => {
            const body = {
                to: this.props.stateSummary.client.email,
                from: this.salesman.email,
                replyTo: this.salesman.email,
                subject: 'Oferta od FANUC',
                html: `${this.props.stateSummary['personalizedEmail'].title} <br/> ${this.props.stateSummary['personalizedEmail'].description} <br/><br/>Z poważaniem,<br/> ${this.salesman.name}`,
                attachments: [
                    {
                        filename: `${file.name}`,
                        content: resp,
                        encoding: 'base64'
                    },
                    ...await this.additionalAttachments(),
                    fullSpecs.length > 0 && {
                    ...await this.mergePDFDocuments()
                    }

                ]
            };
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/email`, {...body}, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
        });
    };

    async fileSaver(url) {
        const offerNo = await this.setOfferNo();
        const filename = `oferta-${offerNo.replace(/\//g, '-')}.pdf`;
        const getBlob = await axios.get(url, {
            responseType: 'blob'
        });
        const response = await getBlob.data;
        const file = await new File([response], filename, {type: response.type});
        return file;
    };
}
