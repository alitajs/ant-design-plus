const fs = require('fs');
const glob = require('glob');
const less = require('less');
const path = require('path');

function cbk(err) {
  if (err) throw err;
}

/**
 * @param {string[]} paths
 */
function buildLess(entry, outdir) {
  entry = entry || path.join(__dirname, '../components/index.less');
  entrydir = path.join(entry, '..');
  outdir = outdir || path.join(__dirname, '../dist');
  fs.readFile(entry, 'utf8', function(err, data) {
    if (err) throw err;
    less.render(data, { paths: [entrydir] }).then(function(output) {
      const cssFile = path.join(outdir, 'index.css');
      fs.writeFile(cssFile, output.css, { encoding: 'utf8' }, cbk);
    }, cbk);
  });
  glob(path.join(entrydir, '**/*.less').replace(/\\/g, '/'), {}, function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;
        const lessFile = path.join(outdir, path.relative(entrydir, file));
        fs.writeFile(lessFile, data, { encoding: 'utf8' }, cbk);
      });
    });
  });
}

buildLess(process.argv[2], process.argv[3]);
