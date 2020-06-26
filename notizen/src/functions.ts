import { iNote } from "./interfaces";
import * as jsCookie from "js-cookie";


export class NoteFunctions {

    public static getNotes(): Promise<iNote[]> {
        return new Promise<iNote[]>((resolve, reject) => {
            let notizen = jsCookie.get("notizen");
            if (notizen) {
                resolve(JSON.parse(notizen));
            } else {
                resolve([]);
            }
        });
    }

    public static saveNotes(notesToSave: iNote[]) {
        jsCookie.set("notizen", JSON.stringify(notesToSave), { expires: 365 });
    }

}