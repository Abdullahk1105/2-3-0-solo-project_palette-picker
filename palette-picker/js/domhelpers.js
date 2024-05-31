import palettes from "../palettes.json"
import { v4 as uuidv4 } from 'uuid';
import {setLocalStorageKey,getLocalStorageKey} from "./localstorage";

export const deleteLocalStorageKey = (key) => {
    localStorage.removeItem(key);
};


export const makePalettePicker = (paletteObj) => {
    const { uuid, title, colors, temperature } = paletteObj;

    const li = document.createElement('li');
    li.setAttribute('data-uuid', uuid);
    const headingDiv = document.createElement('div');
    headingDiv.setAttribute('class', 'heading-div');
    const heading = document.createElement('h3');

    const colorContainer = document.createElement('div');
    colorContainer.setAttribute('class', 'color-container');

    const colorOneContainer = document.createElement('div');
    colorOneContainer.setAttribute('class', 'pre-palette');
    const colorOneText = document.createElement('div');
    colorOneText.setAttribute('class', 'color-text');
    const colorOneButton = document.createElement('button');
    colorOneButton.setAttribute('class', 'button-class');
    colorOneButton.setAttribute('data-copy-message-id', uuid + '-copy-message-1');

    const colorTwoContainer = document.createElement('div');
    colorTwoContainer.setAttribute('class', 'pre-palette');
    const colorTwoText = document.createElement('div');
    colorTwoText.setAttribute('class', 'color-text');
    const colorTwoButton = document.createElement('button');
    colorTwoButton.setAttribute('class', 'button-class');
    colorTwoButton.setAttribute('data-copy-message-id', uuid + '-copy-message-2');

    const colorThreeContainer = document.createElement('div');
    colorThreeContainer.setAttribute('class', 'pre-palette');
    const colorThreeText = document.createElement('div');
    colorThreeText.setAttribute('class', 'color-text');
    const colorThreeButton = document.createElement('button');
    colorThreeButton.setAttribute('class', 'button-class');
    colorThreeButton.setAttribute('data-copy-message-id', uuid + '-copy-message-3');
    const colorTextContainer =  document.createElement('div');

    const deleteButtonDiv =  document.createElement('div'); deleteButtonDiv.setAttribute('id', 'delete-container')
    
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', 'delete');
    deleteButtonDiv.append(deleteButton)
    const temperatureDiv = document.createElement('div');
    temperatureDiv.setAttribute('class', 'temperature-div');

    const messageElementOne = document.createElement('p');
    messageElementOne.setAttribute('id', uuid + '-copy-message-1');
    const messageElementTwo = document.createElement('p');
    messageElementTwo.setAttribute('id', uuid + '-copy-message-2');
    const messageElementThree = document.createElement('p');
    messageElementThree.setAttribute('id', uuid + '-copy-message-3');


    const colorOneFontText = document.createElement('p');colorOneFontText.setAttribute('class', 'text-font')
    const colorOneExample = document.createElement('p');colorOneExample.setAttribute('class', 'Example-font')
    const colorTwoFontText = document.createElement('p');colorTwoFontText.setAttribute('class', 'text-font')
    const colorTwoExample = document.createElement('p');colorTwoExample.setAttribute('class', 'Example-font')
    const colorThreeFontText = document.createElement('p');colorThreeFontText.setAttribute('class', 'text-font')
    const colorThreeExample = document.createElement('p');colorThreeExample.setAttribute('class', 'Example-font')

    li.append(headingDiv, colorContainer, deleteButtonDiv, temperatureDiv);
    headingDiv.append(heading);
    colorOneContainer.append(colorOneText, colorOneButton, messageElementOne);
    colorTwoContainer.append(colorTwoText, colorTwoButton, messageElementTwo);
    colorThreeContainer.append(colorThreeText, colorThreeButton, messageElementThree);
    colorContainer.append(colorOneContainer, colorTwoContainer, colorThreeContainer);

    colorOneText.append(colorOneFontText, colorOneExample)
    colorTwoText.append(colorTwoFontText, colorTwoExample)
    colorThreeText.append(colorThreeFontText, colorThreeExample)

    heading.textContent = title;
    colorOneFontText.textContent = 'Text';
    colorOneExample.textContent = 'Example'
    colorOneButton.textContent = 'Copy ' + colors[0];
    colorTwoFontText.textContent = 'Text';
    colorTwoExample.textContent = 'Example'
    colorTwoButton.textContent = 'Copy ' + colors[1];
    colorThreeFontText.textContent = 'Text';
    colorThreeExample.textContent = 'Example'
    colorThreeButton.textContent = 'Copy ' + colors[2];
    deleteButton.textContent = "Delete Palette";
    temperatureDiv.textContent = temperature;

    // Set the temperature banner color based on the temperature value
    if (temperature.toLowerCase() === 'warm') {
        temperatureDiv.style.backgroundColor = '#4d0905';
    } else if (temperature.toLowerCase() === 'cool') {
        temperatureDiv.style.backgroundColor = '#0b244d';
    } else if (temperature.toLowerCase() === 'neutral'){
        temperatureDiv.style.backgroundColor = 'gray';
    }


    colorOneText.style.backgroundColor = colors[0];
    colorTwoText.style.backgroundColor = colors[1];
    colorThreeText.style.backgroundColor = colors[2];

document.querySelector("#palette-cards").append(li);


};

export const initPaletteCards = () => {
    // Check if the palettes key in localStorage is empty
    let storedPalettes = getLocalStorageKey("palettes");
    if (!storedPalettes || storedPalettes.length === 0) {
        console.log("The stored palette list was empty. Initializing standard palette list");
        setLocalStorageKey("palettes", palettes);
        storedPalettes = palettes;
    }

    storedPalettes.forEach(makePalettePicker);
};

export const copyText = () => {
    document.querySelector('#palette-cards').addEventListener('click', (event) => {
        if (event.target.classList.contains('button-class')) {
            const buttonText = event.target.innerText;
            const originalButtonText = event.target.innerText;
            navigator.clipboard.writeText(buttonText).then(() => {
                const messageId = event.target.getAttribute('data-copy-message-id');
                const message = document.getElementById(messageId);
                if (message) {
                    event.target.innerText = 'Copied Hex!';
                    setTimeout(() => {
                        event.target.innerText = '';
                        event.target.innerText = originalButtonText;
                    }, 1000);
                } else {
                    console.error('Element with ID "' + messageId + '" not found');
                }
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    });
};




export const handleDeletePalette = (event) => {
    if (!event.target.matches("#delete")) {
        return;
    }

    const currentPaletteLI = event.target.closest("li");

    const palettes = getLocalStorageKey("palettes");
    const indexToRemove = palettes.findIndex(
        (palette) => palette.uuid === currentPaletteLI.dataset.uuid
    );
    palettes.splice(indexToRemove, 1);

    setLocalStorageKey("palettes", palettes);

    currentPaletteLI.remove();
};
