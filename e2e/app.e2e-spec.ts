import { BeastWebPage } from './app.po';

describe('beast-web App', () => {
  let page: BeastWebPage;

  beforeEach(() => {
    page = new BeastWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
