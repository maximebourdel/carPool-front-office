import { FrontOfficePage } from './app.po';

describe('front-office App', () => {

    let page: FrontOfficePage;

    beforeEach(() => {
        page = new FrontOfficePage();
    });

    it('Devra afficher que l\'application fonctionne', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('L\'application fonctionne !');
    });
});
