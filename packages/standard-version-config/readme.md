# `@codespartan/standard-version-config`

Este paquete proporciona una configuración compartida para Standard Version en tus proyectos. Al usar esta configuración, aseguras que el versionado y la generación de changelogs sean consistentes y fáciles de mantener.

## Instalación

Para instalar el paquete, usa `npm` o `yarn`:

```sh
npm install @codespartan/standard-version-config --save-dev
# o
yarn add @codespartan/standard-version-config --dev
```

## Uso

Para usar la configuración compartida de Standard Version, crea o actualiza tu archivo `.versionrc.cjs` en la raíz de tu proyecto con el siguiente contenido:

```js
module.exports = {
	...require('@codespartan/standard-version-config/.versionrc')
};
```

Esto extenderá la configuración de Standard Version del paquete `@codespartan/standard-version-config`.

## Scripts

En tu `package.json`, puedes añadir los siguientes scripts para automatizar la generación de changelogs y el versionado:

```json
{
  "scripts": {
    "buildAndChangelog": "npm run changelog",
    "changelog": "npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md",
    "sort": "npx sort-package-json"
  }
}
```

## Contribuir

Si deseas contribuir a este paquete, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y haz commit con un mensaje descriptivo.
4. Push tus cambios a tu fork.
5. Crea un pull request al repositorio principal.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
