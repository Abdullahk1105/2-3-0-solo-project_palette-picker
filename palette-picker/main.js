import './style.css'
import { initPaletteCards } from './js/domhelpers'
import { createCard } from './js/eventhandlers'
import { handleDeletePalette } from './js/domhelpers'
import { copyText } from './js/domhelpers'



const main = () => {
    initPaletteCards()
    document.querySelector('form').addEventListener('submit', createCard);
    document.querySelector('#palette-cards').addEventListener('click', handleDeletePalette);
    copyText()


}


main()