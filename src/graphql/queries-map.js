import {getControllers} from "./controllers";
import {getSelectedMachine} from "./selected-machine";
import {getRenishaws} from "./renishaws";
import {getMetrols} from "./metrols";
import {getBlums} from "./blum";
import {getTables} from "./tables";
import {getShavings} from "./shavings";
import {getAdvHeights} from "./column-adv";
import {getStandardHeights} from "./column-standard";
import {getSpindles} from "./spindles";
import {getTablesOptions} from "./tables-options";
import {getAutomatizations} from "./automatizations";
import {getSoftwareOptions} from "./software-options";
import {getOthers} from "./others";

export const QueriesMap = [
    {content: "machines", key: "machines",savedOffer: "maszyna", query: getSelectedMachine, name: "Maszyna podstawowa"},
    {content: "automatyzacjas", key: "automatyzacjas",savedOffer: "automatyzacja", query: getAutomatizations, name: "Automatyzacja"},
    {content: "controllers", key: "controllers",savedOffer: "sterownik", query: getControllers, name: "Sterownik"},
    {content: "opcje_softwares", key: "opcjeSoftwares",savedOffer: "software", query: getSoftwareOptions, name: "Opcja software"},
    {content: "wrzecionas", key: "wrzecionas",savedOffer: "wrzeciona", query: getSpindles, name: "Wrzeciono"},
    {content: "wysokosc_kolumny_standards",savedOffer: "wysokosc_standard", key: "wysokoscKolumnyStandards", query: getStandardHeights, name: "Wysokość kolumny Standard"},
    {content: "column_height_advs",savedOffer: "wysokosc_adv", key: "wysokoscKolumnyAdvs", query: getAdvHeights, name: "Wysokość kolumny ADV"},
    {content: "wiories", key: "wiories",savedOffer: "wiory", query: getShavings, name: "Odprowadzenie wiórów"},
    {content: "tables", key: "tables",savedOffer: "stol", query: getTables, name: "Stół"},
    {content: "opcje_do_stolows", key: "opcjeDoStolows",savedOffer: "opcje_do_stolow", query: getTablesOptions, name: "Opcje do stołów"},
    {content: "blums", key: "blums",savedOffer: "blum", query: getBlums, name: "Sondy Blum"},
    {content: "metrols", key: "metrols",savedOffer: "metrol", query: getMetrols, name: "Sondy Metrol"},
    {content: "renishaws", key: "renishaws",savedOffer: "renishaw", query: getRenishaws, name: "Sondy Renishaw"},
    {content: "pozostales", key: "pozostales",savedOffer: "pozostale", query: getOthers, name: "Pozostałe"},
];
