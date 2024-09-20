import { AuthCore } from './auth.core';

const originalFetch = window.fetch;
window.fetch = async (input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
	const authCoreInstance = AuthCore.getInstance();
	const token = authCoreInstance.getToken();

	if (token) {
		init ||= {};
		init.headers ||= {};
		(init.headers as Record<string, string>).Authorization = `Bearer ${token}`;
	}

	return originalFetch(input, init);
};
