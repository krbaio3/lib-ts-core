# `@codespartan/settings-config`

Esta biblioteca contiene configuraciones básicas para herramientas de desarrollo como Standard Version, lint-staged, Commitizen y Husky. Al usar esta configuración, aseguras que tu flujo de trabajo de desarrollo sea consistente y fácil de mantener.

## Instalación

Para instalar el paquete, usa `npm` o `yarn`:

```sh
npm install @codespartan/settings-config --save-dev
# o
yarn add @codespartan/settings-config --dev
```

## Uso

Para usar las configuraciones compartidas, asegúrate de tener los archivos de configuración necesarios en tu proyecto. Aquí hay una descripción de cada archivo incluido y cómo usarlos:

### `Release`

Script para manejar la publicación de versiones para la librería `semver`.

```sh
import main from '@codespartan/settings-config/settings-config/release';
main();
```

### `Lintstaged`

Configuración para `lint-staged`, que permite ejecutar linters en los archivos que están a punto de ser confirmados. Asegúrate de tener el siguiente contenido:

```javascript
import lintStaged from '@codespartan/settings-config/lintstaged'
export default lintStaged
```

### `Commitizen`

Configuración para `Commitizen`, que ayuda a escribir mensajes de commit siguiendo un estándar. Asegúrate de tener el siguiente contenido:

```javascript
import commitizen from '@codespartan/settings-config/conventional-changelog'
export default commitizen;
```

Para usar Commitizen, ejecuta:

```sh
npx git-cz
```

### `Husky`

Directorio que contiene los hooks de Husky para automatizar tareas en diferentes etapas del flujo de trabajo de Git. 

#### husky init (recommended) 

```sh
npx husky-init && npm install
```

Para agregar todos los hooks detallados, debes crear los archivos correspondientes en el directorio `.husky/` y asegurarte de que tengan el contenido adecuado:

### `pre-push`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test
```

### `pre-rebase`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test && eslint . --fix
```

### `pre-commit`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### `commit-msg`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit "$1"
```

### `prepare-commit-msg`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

exec < /dev/tty && npx cz --hook || true
```

### `post-merge`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm install
```

Asegúrate de que estos archivos sean ejecutables. Puedes hacerlo con el siguiente comando:

```sh
chmod +x .husky/*
```

Con estos hooks, tendrás configurado Husky para automatizar varias tareas en diferentes etapas del flujo de trabajo de Git.


## Contribuir

Si deseas contribuir a esta biblioteca, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu característica o corrección de errores.
3. Realiza tus cambios y haz commit con un mensaje descriptivo.
4. Empuja tus cambios a tu fork.
5. Crea un pull request al repositorio principal.

## Licencia

Este proyecto está licenciado bajo la Licencia ISC. Consulta el archivo `LICENSE` para más detalles.
