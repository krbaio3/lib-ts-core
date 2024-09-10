import fs from 'node:fs';
import { execSync } from 'node:child_process';
import semver from 'semver';
import process from 'node:process';
import console from 'node:console';
import _packageJson from './package.json' assert { type: 'json' };

const currentVersion = _packageJson.version;

function handleError(message) {
	console.error(message);
	throw new Error(message);
}

function getNextVersion(currentVersion, releaseType) {
	const nextVersion = semver.inc(currentVersion, releaseType, 'rc');
	if (!nextVersion) {
		handleError(
			`Invalid release type: ${releaseType}\nUsage: node release.js [major|minor|patch|prerelease]`,
		);
	}

	return nextVersion;
}

function updatePackageJsonVersion(packageJsonPath, nextVersion) {
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
	packageJson.version = nextVersion;
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, undefined, 2));
}

function commitAndTagVersion(nextVersion, packageJsonPath) {
	execSync(`git add ${packageJsonPath}`);
	execSync(`git commit -m "Release v${nextVersion}"`);
	execSync(`git tag -a v${nextVersion} -m "Version ${nextVersion}"`);
}

function pushChanges(nextVersion) {
	execSync('git push origin master');
	execSync(`git push origin v${nextVersion}`);
}

function main() {
	const releaseType = process.argv[2];
	if (!releaseType) {
		handleError('Usage: node release.js [major|minor|patch|prerelease]');
	}

	const nextVersion = getNextVersion(currentVersion, releaseType);

	const packageJsonPath = './package.json';
	updatePackageJsonVersion(packageJsonPath, nextVersion);

	commitAndTagVersion(nextVersion, packageJsonPath);

	pushChanges(nextVersion);

	console.log(`Released version ${nextVersion}`);
}

main();
