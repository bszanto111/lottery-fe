import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display user list', () => {
    page.navigateTo();
    const firstUserData = element(by.css('.user-item:nth-of-type(1)')).getText();
    expect(firstUserData).toBe('1234 - bszanto');
    const secondUserData = element(by.css('.user-item:nth-of-type(2)')).getText();
    expect(secondUserData).toBe('2345 - tszabo');
    const thirdUserData = element(by.css('.user-item:nth-of-type(3)')).getText();
    expect(thirdUserData).toBe('3456 - ttoth');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
