import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function ContentTable(props) {
    let i = 0;
    return (
        <View>
            <View style={[styles.tableHeader]} fixed>
                <Text style={[styles.tableText, styles.tableContentNumber]}>Nr</Text>
                <Text style={[
                    styles.tableText, styles.tableDesc, {
                        width: (props.detailed && props.total > 0) ?
                            60 + "%" :
                            props.detailed ?
                                80 + "%" :
                                90 + "%"
                    }
                ]}
                >
                    Nazwa i Opis urządzenia
                </Text>
                {props.detailed &&
                <Text style={[styles.tableText, styles.tableContentUnitPrice]}>{`Cena/szt.\n EUR/netto`}</Text>
                }
                {props.total > 0 &&
                <Text style={[styles.tableText, styles.tableContentQuantity]}>IL.</Text>
                }
                {(props.detailed && props.total > 0) &&
                <Text style={[styles.tableText, styles.tableContentTotalPrice]}>{`Suma \n EUR/netto`}</Text>
                }
            </View>
            <View style={styles.tableSubheader} fixed>
                <Text style={styles.subHeaderText}>Referencja konfiguracji: {props.offerNo}</Text>
            </View>
            <View>
                {props.content.map((value, index) => {
                    i = index + 1;
                    return (
                        <View style={styles.row}>
                            <Text style={[styles.tableText, styles.tableContentNumber]}>{index + 1}</Text>
                            <View style={[
                                styles.tableDesc, {
                                    width: (props.detailed && props.total > 0) ?
                                        60 + "%" :
                                        props.detailed ?
                                            80 + "%" :
                                            90 + "%"
                                }
                            ]}>
                                <Text style={[styles.tableText, styles.italic, {display: "block"}]}>
                                    {value.name}
                                </Text>
                                <Text style={styles.tableText}>
                                    {value.description}
                                </Text>
                            </View>
                            {props.detailed &&
                            <Text style={[styles.tableText, styles.tableContentUnitPrice]}>{numbersWithSpaces(value.price)}</Text>
                            }
                            {props.total > 0 &&
                            <Text style={[styles.tableText, styles.tableContentQuantity]}>{value.qty}</Text>
                            }
                            {(props.detailed && props.total > 0) &&
                            <Text style={[styles.tableText, styles.tableContentTotalPrice]}>
                                {numbersWithSpaces(value.qty * value.price)}
                            </Text>
                            }
                        </View>
                    );
                })}
                {(props.detailed && !!props.discount) &&
                <View style={[{marginTop: 20 + "px", marginBottom: 20 + "px"}]}>
                    <View style={styles.row}>
                        <Text style={[styles.tableText, styles.tableContentNumber]}/>
                        <Text style={[
                            styles.tableText,
                            styles.tableDesc,
                            {textAlign: "right", fontFamily: "Lato-Bold", width: 80 + "%"}
                        ]}>
                            Cena maszyny przed rabatem
                        </Text>
                        <Text style={[styles.tableText, styles.tableContentTotalPrice]}>
                            {numbersWithSpaces(props.machineCost)}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.row}>
                            <Text style={[styles.tableText, styles.tableContentNumber]}/>
                            <Text style={[
                                styles.tableText,
                                styles.tableDesc,
                                {textAlign: "right", fontFamily: "Lato-Bold", width: 80 + "%"}
                            ]}>
                                Rabat
                            </Text>
                            <Text style={[styles.tableText, styles.tableContentTotalPrice]}>{props.discount} %</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.tableText, styles.tableContentNumber]}/>
                            <Text style={[
                                styles.tableText,
                                styles.tableDesc,
                                {textAlign: "right", fontFamily: "Lato-Bold", width: 80 + "%"}
                            ]}>
                                Kwota rabatu
                            </Text>
                            <Text style={[styles.tableText, styles.tableContentTotalPrice]}>
                                {numbersWithSpaces((+props.discountValue).toFixed(2))}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.tableText, styles.tableContentNumber]}/>
                            <Text style={[
                                styles.tableText,
                                styles.tableDesc,
                                {textAlign: "right", fontFamily: "Lato-Bold", width: 80 + "%"}
                            ]}>
                                Cena maszyny po rabacie
                            </Text>
                            <Text style={[styles.tableText, styles.tableContentTotalPrice]}>
                                {numbersWithSpaces(props.machineCost - props.discountValue)}
                            </Text>
                        </View>
                    </View>
                </View>
                }
                {props.services.length > 0 && props.services.map((value, index) => {
                    i = i + index;
                    return (
                        <View style={styles.row}>
                            <Text style={[styles.tableText, styles.tableContentNumber]}>{i + 1}</Text>
                            <View style={[styles.tableDesc, {width: props.detailed ? 60 + "%" : 90 + "%"}]}>
                                <Text style={[styles.tableText, styles.italic, {display: "block"}]}>
                                    {value.name}
                                </Text>
                                <Text style={styles.tableText}>
                                    {value.description}
                                </Text>
                            </View>
                            {props.detailed &&
                            <Text style={[styles.tableText, styles.tableContentUnitPrice]}>{numbersWithSpaces(value.price)}</Text>
                            }
                            <Text style={[styles.tableText, styles.tableContentQuantity]}>{value.qty}</Text>
                            {props.detailed &&
                            <Text style={[styles.tableText, styles.tableContentTotalPrice]}>
                                {numbersWithSpaces(value.qty * value.price)}
                            </Text>
                            }
                        </View>
                    );
                })
                }
                {!!props.comment &&
                <View style={[styles.row]}>
                    <Text style={[styles.tableText, styles.tableContentNumber]}>{i + 2}</Text>
                    <Text style={[styles.tableText, styles.tableDesc, {width: 80 + "%"}]}>{props.comment}</Text>
                    <Text style={[styles.tableText, styles.tableContentTotalPrice]}>
                        {numbersWithSpaces(props.addedPrice)}
                    </Text>
                </View>
                }
            </View>
            {props.total > 0 &&
            <View style={[{marginTop: 20 + "px"}]}>
                <View style={styles.row}>
                    <Text style={[styles.tableText, styles.tableContentNumber]}/>
                    <Text style={[
                        styles.tableText, styles.tableDesc,
                        {textAlign: "right", fontFamily: "Lato-Bold", width: 80 + "%"}
                    ]}
                    >
                        Całkowita wartość zamówienia
                    </Text>
                    <Text style={[styles.tableText, styles.tableContentTotalPrice]}>
                        {numbersWithSpaces(props.total.toFixed(2))}
                    </Text>
                </View>
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    italic: {
        fontFamily: "Lato-BoldItalic",
        fontSize: 10
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 5,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: "#fed100"
    },
    tableSubheader: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 7 + "%",
        backgroundColor: "#c6c6c6"
    },
    subHeaderText: {
        fontSize: 10
    },
    tableText: {
        fontSize: 10
    },
    tableDesc: {
        paddingHorizontal: 3
    },
    tableContentNumber: {
        width: 5 + "%",
        textAlign: "left",
        paddingHorizontal: 3
    },
    tableContentUnitPrice: {
        width: 15 + "%",
        textAlign: "center",
        paddingHorizontal: 3
    },
    tableContentTotalPrice: {
        width: 15 + "%",
        textAlign: "center",
        paddingHorizontal: 3
    },
    tableContentQuantity: {
        width: 5 + "%",
        textAlign: "center",
        paddingHorizontal: 3
    },
    row: {
        flexDirection: "row",
        paddingTop: 3,
        paddingBottom: 3
    }
});
