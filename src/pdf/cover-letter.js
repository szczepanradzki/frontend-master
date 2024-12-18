import React from "react";
import {Text, View, StyleSheet} from "@react-pdf/renderer";

export function CoverLetter(props) {
    return (
        <View>
            <Text style={styles.title}>Oferta nr. {props.offerNo}</Text>
            <Text style={[styles.text, {fontFamily: "Lato-Bold", marginBottom: 5}]}>{props.coverLetter.title}</Text>
            <Text style={styles.text}>{props.coverLetter.text}</Text>
            <Text style={styles.textBottom}>Zapraszam do kontaktu bezpośredniego. Z przyjemnością odpowiem na wszelkie pytania dodatkowe.</Text>
            <Text style={styles.regards}><Text style={styles.red}>FANUC </Text><Text>POLSKA SP. Z O.O.</Text></Text>
            <Text style={styles.signature}>{props.user.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        fontFamily: "Lato-Bold",
        fontSize: 16
    },
    text: {
        fontSize: 10
    },
    textBottom: {
        fontSize: 10,
        marginTop: 10
    },
    regards: {
        marginTop: 10,
        fontFamily: "Lato-Bold",
        fontSize: 10

    },
    red: {
        color: "#C32C30"
    },
    signature: {
        fontSize: 9,
        fontFamily: "Lato-BoldItalic"
    }
});
