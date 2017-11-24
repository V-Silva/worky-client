import { WorkyPage } from './app.po';

describe('worky App', () => {
  let page: WorkyPage;

  beforeEach(() => {
    page = new WorkyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
