import React from "react";
import {BlockTitle} from "framework7-react";

export function Table({title, children}) {
    return (
        <div className="data-table card">
            <BlockTitle large>{title}</BlockTitle>
            <table>
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th className="text-center">Opis</th>
                    <th>Cena EUR/netto</th>
                </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
            </table>
        </div>
    );
}
