import React from "react";
import { AccordionContent, Block, ListItem, Button, Link } from "framework7-react";
import { numbersWithSpaces } from "../utils/numbersSpacer";

export function AccordionItem({title, price, buttonText, contentText, pdf, buttonFunc}) {
    return (
        <ListItem title={title}
                  after={`${numbersWithSpaces(price)} EUR/netto`}
                  noChevron
                  accordionItem
        >
            <AccordionContent>
                <Block>
                    <p className="text-center">{contentText}</p>
                </Block>
                <Block>
                    {pdf &&
                    <Link href={process.env.REACT_APP_BACKEND_URL + pdf}
                          className="text-center width-100"
                          target="_blank"
                          external
                    >
                        Zobacz pełny opis
                    </Link>
                    }
                </Block>
                <Block className="text-center">
                    <Button className="btn__action--link"
                            type="button"
                            text={buttonText}
                            onClick={buttonFunc}
                            round
                            outline/>
                </Block>
            </AccordionContent>
        </ListItem>
    );
}
