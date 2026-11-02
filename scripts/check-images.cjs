const fs = require('node:fs');
const path = require('node:path');

const raster = /\.(?:png|jpe?g|gif|avif|bmp|tiff?)$/i;
function findNonWebp(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? findNonWebp(file) : entry.isFile() && raster.test(entry.name) ? [file] : [];
  });
}

if (require.main === module) {
  const files = ['public', 'app', 'components', 'lib', 'src'].flatMap(findNonWebp);
  if (files.length) {
    console.error('Convert these website images to WebP before building:\n' + files.join('\n'));
    process.exitCode = 1;
  }
}
module.exports = { findNonWebp };
