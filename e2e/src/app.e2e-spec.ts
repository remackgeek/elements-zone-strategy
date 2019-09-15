import { AppPage } from './app.po';
import { element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });


  it('should set max button and click first looped div', () => {
    page.navigateTo();
    let dots = element.all(by.css('div.filled'));
    expect(dots.count()).toEqual(2);
    const ratingBtn = element(by.id('ratingBtn'));
    ratingBtn.click();
    dots = element.all(by.css('div.filled'));
    expect(dots.count()).toEqual(10);
    const firstDot = element(by.css('div.index0'));
    firstDot.click();
    dots = element.all(by.css('div.filled'));
    expect(dots.count()).toEqual(2);
  });

});
