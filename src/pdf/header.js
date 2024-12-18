import React from "react";
import {View, Text, StyleSheet, Image} from "@react-pdf/renderer";

export function Header(props) {
    const styles = StyleSheet.create({
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 35,
            marginHorizontal: -35,
            borderBottomStyle: "solid",
            borderBottomColor: "#000000",
            borderBottomWidth: 1
        },
        view: {
            flex: 1,
            paddingLeft: 35
        },
        text: {
            fontSize: 8
        },
        bold: {
            fontFamily: "Lato-Bold",
            fontSize: 8
        },
        image: {
            flex: 1,
            width: 150
        }
    });
    return (
        <View style={styles.header} fixed={props.fixed}>
            <View style={styles.view}>
                <Text style={styles.bold}>FANUC POLSKA SP. Z O.O.</Text>
                <Text style={styles.text}>UL. TADEUSZA WENDY 2</Text>
                <Text style={styles.text}>PL-52-407 WROCŁAW</Text>
                <Text style={styles.text}>Poland</Text>
            </View>
            <Image
                style={styles.image}
                src="/static/pdf/logopdf.jpg"
            />
            <View style={styles.view}/>
        </View>
    );
}
