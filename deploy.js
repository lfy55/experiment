var ghpages = require('gh-pages');

ghpages.publish('dist', {
  user: {
    name: 'lfy55',
    email: 'sqk_55@163.com',
  }
}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('deploy success')
  }
});
