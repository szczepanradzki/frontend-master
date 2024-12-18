import React from "react";
import {Text, View, StyleSheet} from "@react-pdf/renderer";
import moment from "moment";

export function DocumentTitle(props) {

    const setDate = () => {
        return {
            currentDate: moment().format("DD/MM/yy"),
            expiryDate: moment().add(30, "d").format("DD/MM/yy")
        };
    };

    const styles = StyleSheet.create({
        borderLeftBox: {
            borderLeftStyle: "solid",
            borderLeftColor: "#fed100",
            borderLeftWidth: 2
        },
        box: {
            paddingTop: 15,
            paddingLeft: 15,
            paddingBottom: 5,
            borderTopStyle: "solid",
            borderTopColor: "#fed100",
            borderTopWidth: 2,
            borderRightStyle: "solid",
            borderRightColor: "#fed100",
            borderRightWidth: 2
        },
        rightBottom: {
            position: "relative",
            marginRight: 32.5,
            marginTop: 30,
            borderBottomStyle: "solid",
            borderBottomColor: "#fed100",
            borderBottomWidth: 2
        },
        skewed: {
            position: "absolute",
            right: -23,
            bottom: 8,
            height: 45,
            width: 45,
            transform: "rotate(45deg)",
            borderRightStyle: "solid",
            borderRightColor: "#fed100",
            borderRightWidth: 2
        },
        title: {
            marginBottom: 10,
            fontFamily: "Lato-Bold",
            fontSize: 18
        },
        text: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: 220,
            lineHeight: 2
        },
        insideText: {
            flex: 1,
            fontFamily: "Lato-Bold",
            fontSize: 8,
            lineHeight: 1.5
        },
        leftColumn: {
            flex: 1,
            fontFamily: "Lato-Regular",
            fontSize: 8
        }
    });
    return (
        <View style={[styles.borderLeftBox, {marginLeft: "auto"}]} fixed={props.fixed}>
            <View style={styles.box}>
                <Text style={styles.title}>Oferta handlowa</Text>
                <View style={styles.text}><Text style={styles.leftColumn}>Numer oferty:</Text><Text style={styles.insideText}>{props.offerNo}</Text></View>
                <View style={styles.text}>
                    <Text style={styles.leftColumn}>Data wystawienia:</Text>
                    <Text style={styles.insideText}>{setDate().currentDate}</Text>
                </View>
                <View style={styles.text}>
                    <Text style={styles.leftColumn}>Ważność oferty:</Text>
                    <Text style={styles.insideText}>{setDate().expiryDate}</Text></View>
                <View style={styles.text}>
                    <Text style={styles.leftColumn}>Osoba kontaktowa:</Text>
                    <View style={styles.insideText}>
                        <Text>{props.user.name}</Text>
                        <Text>{props.user.email}</Text>
                        <Text>{props.user.phone}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.rightBottom}>
                <View style={styles.skewed}/>
            </View>
        </View>
    );
}
