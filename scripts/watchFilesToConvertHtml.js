#!/usr/bin/env node

(() => {
  'use strict';
  
  const serve = require('serve-static');
  const fs = require('fs');
  let livereload = require('livereload');
  const connect  = require('connect');
  let server = connect();
  const fa = require('markdown-it-fontawesome');
  const container = require('markdown-it-container');
  const containerOptions = level => ({validate: params => params.trim().match(new RegExp('alert\\s+alert-' + level))});
  const md  = require('markdown-it')({ html: true })
    .use(fa)
    .use(container, 'alert alert-warning', containerOptions('warning'))
    .use(container, 'alert alert-danger', containerOptions('danger'))
    .use(container, 'alert alert-info', containerOptions('info'));
  const serveIndex = require('serve-index');

  server.use((req, res, next) => {
    if(req.url.match(/.*\.md$/)) {
      res.writeHead(200, {'Content-type': 'text/html'}); 
      let html = md.render(fs.readFileSync(__dirname + '/..' + req.url).toString());
      html += `<script>
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
                         ':35729/livereload.js?snipver=1"></' + 'script>')</script>`;
      res.end(html);
    } else {
      next();
    }
  });
  server.use(serve(__dirname + '/../'));
  server.use(serveIndex('.'));
   
  server.listen(3000);
   
  livereload = require('livereload');
  server = livereload.createServer({
    exts: ['md', 'png', 'jpg', 'gif']
  });
  server.watch('md/**/*.md');
  console.log(`open your favorite browser on http://localhost:3000/ and browse to the page you are editing, changes from the md folder will automatically reload the page`);
  console.log('press Ctrl+C to exit server');
})();
