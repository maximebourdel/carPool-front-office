import { browser, by, element } from 'protractor';

/**
 * Class FrontOfficePage utilisée pour les tests de la page d'accueil
 */
export class FrontOfficePage {
   
    /**
     * Redirige vers la page d'accueil
     * @return url de la page
     */
    navigateTo() {
        return browser.get('/');
    }

    /**
     * Retourne le texte du paragraphe
     * @return {any} Element
     */
    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }
}
