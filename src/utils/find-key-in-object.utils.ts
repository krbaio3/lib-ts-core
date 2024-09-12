export function findKeyInObject(
	object: Record<string, any>,
	keyToFind: string,
	currentDepth = 1,
	maxDepth = 3,
): Record<string, any> | undefined {
	if (currentDepth > maxDepth) return undefined; // Si se excede el nivel de profundidad, retorna null

	if (Object.hasOwn(object, keyToFind)) return object[keyToFind]; // Si la clave existe, devuelve su valor

	for (const key in object) {
		if (object[key] !== null && typeof object[key] === 'object') {
			// Recursivamente busca en subobjetos si no hemos alcanzado la profundidad máxima
			const result = findKeyInObject(object[key], keyToFind, currentDepth + 1, maxDepth);
			if (result !== null) {
				return result; // Devuelve el valor encontrado
			}
		}
	}

	return undefined; // Si no se encuentra la clave, devuelve null
}
