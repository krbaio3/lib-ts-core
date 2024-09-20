# `@codespartan/typescript-config`

Este paquete proporciona una configuración compartida de TypeScript para tus proyectos. Al usar esta configuración, aseguras que el código TypeScript siga un formato consistente y fácil de mantener.

## Instalación

Para instalar el paquete, usa `npm` o `yarn`:

```sh
npm install @codespartan/typescript-config --save-dev
# o
yarn add @codespartan/typescript-config --dev
```

## Uso

Para usar la configuración compartida de TypeScript, crea o actualiza tu archivo `tsconfig.json` en la raíz de tu proyecto con el siguiente contenido:

```json
{
  "extends": "@codespartan/typescript-config"
}
```

Esto extenderá la configuración de TypeScript del paquete `@codespartan/typescript-config`.

## Personalización

Si necesitas personalizar la configuración de TypeScript para un proyecto específico, puedes hacerlo extendiendo la configuración compartida. Por ejemplo:

```json
{
  "extends": "@codespartan/typescript-config",
  "compilerOptions": {
    "strict": false
  }
}
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
