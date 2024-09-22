import { error } from './logger.core';

/**
 * `LocalStorageManager` is a singleton class that provides methods to interact with the local storage.
 * It provides methods to store and retrieve data from the local storage.
 */
export class LocalStorageManager {
	/**
	 * This static method returns the singleton instance of the `LocalStorageManager` class.
	 * If the instance does not exist, it creates a new one.
	 * @returns {LocalStorageManager} The singleton instance of the `LocalStorageManager` class.
	 */
	public static getInstance(): LocalStorageManager {
		LocalStorageManager.instance ||= new LocalStorageManager();
		return LocalStorageManager.instance;
	}

	private static instance: LocalStorageManager;

	/**
	 * The private constructor ensures that the class cannot be instantiated directly.
	 */
	private constructor() {
		// Constructor privado asegura que no se pueda instanciar directamente
	}

	/**
	 * This method stores a value in the local storage.
	 * The value is serialized before being stored.
	 * @param {string} key - The key under which the value will be stored.
	 * @param {any} value - The value to be stored.
	 */
	public setStore(key: string, value: any): void {
		try {
			const serializedValue = JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch (error_) {
			error('Error saving to localStorage', error_);
		}
	}

	/**
	 * This method retrieves a value from the local storage.
	 * The value is deserialized before being returned.
	 * @param {string} key - The key of the value to be retrieved.
	 * @returns {any} The deserialized value, or null if the key does not exist or an error occurred.
	 */
	public getStore(key: string): any {
		try {
			const value = localStorage.getItem(key);
			return value ? JSON.parse(value) : undefined;
		} catch (error_) {
			error('Error retrieving from localStorage', error_);
			return undefined;
		}
	}
}
