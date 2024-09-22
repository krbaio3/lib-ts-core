# `@codespartan/jest-config`

Este paquete proporciona una configuración compartida de Jest para tus proyectos. Al usar esta configuración, aseguras que las pruebas sigan un formato consistente y fácil de mantener.

## Instalación

Para instalar el paquete, usa `npm` o `yarn`:

```sh
npm install @codespartan/jest-config --save-dev
# o
yarn add @codespartan/jest-config --dev
```

## Uso

Para usar la configuración compartida de Jest, crea o actualiza tu archivo `jest.config.js` en la raíz de tu proyecto con el siguiente contenido:

```js
module.exports = {
  preset: '@codespartan/jest-config'
};
```

Esto extenderá la configuración de Jest del paquete `@codespartan/jest-config`.

## Personalización

Si necesitas personalizar la configuración de Jest para un proyecto específico, puedes hacerlo extendiendo la configuración compartida. Por ejemplo:

```js
const baseConfig = require('@codespartan/jest-config');

export default {
  ...baseConfig,
  // Añade tus configuraciones personalizadas aquí
  testEnvironment: 'node',
};
```

## Contribuir

Si deseas contribuir a este paquete, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y haz commit con un mensaje descriptivo.
4. Empuja tus cambios a tu fork.
5. Crea un pull request al repositorio principal.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

