# `@codespartan/commitlint-config`

Este paquete proporciona una configuración compartida de Commitlint para tus proyectos. Al usar esta configuración, aseguras que los mensajes de commit sigan un formato consistente y legible.

## Instalación

Para instalar el paquete, usa `npm` o `yarn`:

```sh
npm install @codespartan/commitlint-config --save-dev
# o
yarn add @codespartan/commitlint-config --dev
```

## Uso

Para usar la configuración compartida de Commitlint, crea o actualiza tu archivo `commitlint.config.js` en la raíz de tu proyecto con el siguiente contenido:

```js
module.exports = {
  extends: ['@codespartan/commitlint-config']
};
```

Esto extenderá la configuración de Commitlint del paquete `@codespartan/commitlint-config`.

## Personalización

Si necesitas personalizar la configuración de Commitlint para un proyecto específico, puedes hacerlo extendiendo la configuración compartida. Por ejemplo:

```js
const baseConfig = require('@codespartan/commitlint-config');

module.exports = {
  ...baseConfig,
  // Añade tus reglas personalizadas aquí
  rules: {
    'header-max-length': [2, 'always', 72]
  }
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
