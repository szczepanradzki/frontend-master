import React from "react";
import {Text, View, StyleSheet} from "@react-pdf/renderer";

export function DeliveryDetails(props) {
    const styles = StyleSheet.create({
        client: {
            marginTop: 0,
            maxWidth: 50 + "%"
        },
        bold: {
            fontSize: 9,
            fontFamily: "Lato-Bold"
        },
        normal: {
            fontSize: 9
        },
        margin: {
            marginTop: 10

        }
    });

    return (
        <View style={styles.client}>
            {props.client &&
            <View style={styles.margin}>
                <Text style={styles.bold}>Klient: {props.client.name}</Text>
                <Text style={styles.normal}>{props.client.street} {props.client.houseno}, {props.client.zipcode} {props.client.city}, Poland</Text>
            </View>
            }
            <View style={styles.margin}>
                <Text style={styles.bold}>Termin dostawy</Text>
                <Text style={styles.normal}>{props.offerTerms.deliveryTerm}</Text>
            </View>
            <View style={styles.margin}>
                <Text style={styles.bold}>Warunki dostawy</Text>
                <Text style={styles.normal}>{props.offerTerms.deliveryConditions}</Text>
            </View>
            <View style={styles.margin}>
                <Text style={styles.bold}>Warunki płatności</Text>
                <Text style={styles.normal}>{props.offerTerms.paymentConditions}</Text>
            </View>
        </View>
    );
}
