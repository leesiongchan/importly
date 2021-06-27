
import {queryPackageJson} from "./query-package-json.js"

export async function unpkg({name, version}) {
	const info = await queryPackageJson(`https://unpkg.com/${name}@${version}/package.json`)
	return {...info, name, version}
}

export async function jsdelivr({name, version}) {
	const info = await queryPackageJson(`https://cdn.jsdelivr.net/npm/${name}@${version}/package.json`)
	return {...info, name, version}
}

export async function jspm({name, version}) {
	const info = await queryPackageJson(`https://ga.jspm.io/npm:${name}@${version.substring(1)}/package.json`)
	return {...info, name, version}
}
