import React, { useState, useContext, useEffect } from 'react';
import { Block, Button, Link, Navbar, NavRight, Page, Popup, List, ListItem } from 'framework7-react';
import { getMailsAddons } from '../graphql/mails-addons';
import { useQuery } from '@apollo/react-hooks';
import { SummaryContext } from '../js/contexts';
import { SingleCheckbox } from '../components/singleCheckbox';

export function AttachmentsPopup(props) {
    const {dispatchSummary} = useContext(SummaryContext);
    const {loading, error, data} = useQuery(getMailsAddons);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if(data && data.mailsAddons.length > 0) {
            data.mailsAddons.map(pdf => {
                if(pdf.default) {
                    setFiles([
                        ...files,
                        {
                            name: pdf.pdfs.name,
                            url: pdf.pdfs.url
                        }
                    ]);
                }
            });
        }
    }, [data]);

    useEffect(() => {
        setAttachments();
    }, [files]);

    const setAttachments = () => {
        dispatchSummary({type: 'CHANGE', payload: {name: 'additionalAttachments', value: files}});
    };

    const changeHandler = (e) => {
        if(e.target.checked) {
            setFiles([
                ...files,
                {
                    name: e.target.name,
                    url: e.target.value
                }
            ]);
        }
        if(!e.target.checked) {
            const filteredFiles = files.filter(file => file.name !== e.target.name);
            setFiles(filteredFiles);
        }
    };
    return (
        <Popup className="popup__personalize"
               opened={props.attachmentsPopupOpen}
               onPopupClosed={() => props.setAttachmentsPopupOpen(false)}
        >
            <Page>
                <Navbar title="Wybierz dodatkowe załączniki do wysłania">
                    <NavRight>
                        <Link popupClose>Zamknij</Link>
                    </NavRight>
                </Navbar>
                <Block>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {JSON.stringify(error)}</p>}
                    {data &&
                    <List>
                        {data.mailsAddons.map(pdf =>
                            <SingleCheckbox key={pdf.pdfs.id}
                                            name={pdf.pdfs.name}
                                            value={pdf.pdfs.url}
                                            defaultCheck={pdf.default || false}
                                            checkHandler={(e) => {
                                                changeHandler(e);
                                            }}
                            />
                        )}
                    </List>
                    }
                </Block>
                <Block>
                    <Button text="Anuluj" popupClose onClick={() => {
                        setFiles([]);
                    }}/>
                    <Button text="Zatwierdź" popupClose onClick={() => {
                        setAttachments();
                    }}/>
                </Block>
            </Page>
        </Popup>
    );
}
