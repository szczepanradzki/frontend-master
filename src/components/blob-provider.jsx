import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { offerHandler } from "../utils/offer-handler";

export function PdfCreator({PDF, response, details}) {
    const handler = new offerHandler(details);
    return (
        <BlobProvider document={PDF}>
            {({blob, url, loading}) => {
                if(!loading && blob && url) {
                    handler.fileSaver(url).then(resp => {
                        handler.saveOffer(resp).then((r) => {
                            response(r)
                        });
                    });
                }
                return <p></p>;
            }}
        </BlobProvider>
    );
}
