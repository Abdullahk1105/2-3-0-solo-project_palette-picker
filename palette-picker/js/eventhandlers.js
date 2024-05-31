
import { makePalettePicker } from "./domhelpers";
import palettes from "../palettes.json"
import { v4 as uuidv4 } from 'uuid';
import { setLocalStorageKey,getLocalStorageKey} from "./localstorage";



export const createCard = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.paletteTitle.value;
    const colors = [
        form.colorOne.value,
        form.colorTwo.value,
        form.colorThree.value,
    ];
    const temperature = form.temp.value;
    const uuid = uuidv4();

    const newPalette = { uuid, title, colors, temperature };

    const palettes = getLocalStorageKey("palettes") || [];
    palettes.push(newPalette);
    setLocalStorageKey("palettes", palettes);

    makePalettePicker(newPalette);


    form.reset();
};