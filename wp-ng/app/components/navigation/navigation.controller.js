export default class NavigationCtrl {
  constructor() {
    this.data = [{
      title: 'test 1',
      data: [{
        title: 'subtitle 1',
        data: [{
          title: 'subsubtitle 1',
          data: [{
            title: 'subsubsubtitle 1'
          }, {
            title: 'subsubsubtitle 2'
          }]
        }, {
          title: 'subsubtitle 2'
        }]
      }, {
        title: 'subtitle 2'
      }]
    }, {
      title: 'test 2'
    }];
  }
}
