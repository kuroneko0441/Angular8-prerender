const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const fs = require('fs');
const path = require('path');
require('reflect-metadata');
require('zone.js/dist/zone-node');
enableProdMode();

const projectName = JSON.parse(fs.readFileSync('angular.json', { encoding: 'utf-8' })).defaultProject;
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/${projectName}-server/main`);

const postingsPath = path.join(__dirname, 'src/assets/postings');
const distPath = path.join(__dirname, 'dist');

const routes = [
  '/',
  '/home',
  ...fs.readdirSync(postingsPath)
    .filter(filename => filename.endsWith('.md'))
    .map(filename => filename.substring(0, filename.length - 3))
    .map(filename => `/postings/${filename}`),
];

const indexFile = fs.readFileSync(path.join(distPath, projectName, 'index.html'), 'utf8');

routes
  .forEach(route => {
    const fullPath = path.join(distPath, projectName, route);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    renderModuleFactory(AppServerModuleNgFactory, {
      document: indexFile,
      url: route,
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP),
      ],
    })
      .then(html => fs.writeFileSync(path.join(fullPath, 'index.html'), html));
  });
