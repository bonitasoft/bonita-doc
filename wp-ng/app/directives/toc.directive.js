import $ from 'jquery';
import 'toc/dist/toc';

export default class TocGenerator {
  constructor() {
    this.restrict = 'AE';
    this.priority = 1;
  }
  compile() {
    return (scope, element, attrs) => this.link(scope, element, attrs);
  }
  link(scope, element, attrs) {
    scope.$watch(() => element.find('.documentation-page h1').html(), () => {
      $(element).find('h2').first().before('<div id="toc"></div><hr>');
      const $toc = $(element).find(attrs.destination || '#toc');
      $toc.toc({
        'selectors': 'h2', //elements to use as headings
        'container': '.documentation-page', //element to find all selectors in
        'smoothScrolling': true, //enable or disable smooth scrolling on click
        'prefix': 'toc', //prefix for anchor tags and class names
        'anchorName': (i, heading, prefix) => prefix + i,
        'headerText': (i, heading, $heading) => $heading.text(),
        'itemClass': () => 'list-group-item'
      });
      $toc.find('ul').addClass('list-group');
    }, true);
  }
  static createInstance() {
    return new TocGenerator();
  }
}
