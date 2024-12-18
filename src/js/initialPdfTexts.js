import pdfContent from "../utils/pdf-content";

export const initialState = {
    coverLetter: {
        title: pdfContent.title,
        text: pdfContent.text
    },
    customOfferTerms: {
        deliveryTerm: pdfContent.deliveryTerm,
        deliveryConditions: pdfContent.deliveryConditions,
        paymentConditions: pdfContent.paymentConditions
    }
};
export const initialEmail = {
    title: "Szanowni Państwo",
    description: "Dziękujemy za zainteresowania produktami FANUC. \n" +
        "Poniżej przedstawiamy specyfikację techniczną oraz cenową produktu FANUC RoboDrill. \n\n"
};
