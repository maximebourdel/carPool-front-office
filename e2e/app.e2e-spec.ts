import { FrontOfficePage } from './app.po';

describe('front-office App', () => {
  let page: FrontOfficePage;

  beforeEach(() => {
    page = new FrontOfficePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
