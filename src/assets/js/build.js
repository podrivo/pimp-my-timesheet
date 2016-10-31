'use strict';

let fs = require('fs'),
	path = require('path'),
	archiver = require('archiver'),
	archive = archiver.create('zip', {}),
	manifestVersion;

function createZipFromDist(versionToBump) {
	let output = fs.createWriteStream('./build_' + versionToBump + '.zip');
	archive.pipe(output);
	archive.directory('./dist', '/').finalize();
}

function cleanOldBuilds(config) {
	fs.readdir(config.dirToRead, (err, files) => {
		files.forEach(file => {
			if (path.extname(file) === '.' + config.extension) {
				fs.unlink(file);
			}
		});
	});
}

function buildExtension(cb) {
	cleanOldBuilds({
		extension: 'zip',
		dirToRead: './'
	});

	fs.readFile('dist/manifest.json', 'utf8', (err, manifestFile) => {
		if (err) {
			throw err;
		}
		let manifest = JSON.parse(manifestFile);
		manifestVersion = Number(manifest.version) + 0.1;
		manifest.version = manifestVersion.toFixed(1);
		let jsonManifest = JSON.stringify(manifest, null, 4);
		fs.writeFile('dist/manifest.json', jsonManifest, 'utf8', () => {
			console.log('Extension version updated!');
		});
		cb(manifestVersion.toFixed(1))
	});

}

buildExtension(createZipFromDist);
