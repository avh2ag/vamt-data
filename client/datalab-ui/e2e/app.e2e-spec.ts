import { DatalabUiPage } from './app.po';

describe('datalab-ui App', () => {
  let page: DatalabUiPage;

  beforeEach(() => {
    page = new DatalabUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
