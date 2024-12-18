import React from "react";
import {Text, View, StyleSheet} from "@react-pdf/renderer";

export function Client(props) {

    const styles = StyleSheet.create({
        client: {
            marginTop: 30
        },
        bold: {
            fontSize: 9,
            fontFamily: "Lato-Bold"
        },
        normal: {
            fontSize: 9
        }
    });
    return (
        props.client &&
        <View style={styles.client}>
            <Text style={styles.bold}>{props.client.name}</Text>
            <Text style={styles.normal}>{props.client.street} {props.client.houseno}</Text>
            <Text style={styles.normal}>{props.client.zipcode} {props.client.city}</Text>
            <Text style={styles.normal}>Poland</Text>
        </View>
    );
}
