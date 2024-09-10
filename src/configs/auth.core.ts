export class AuthCore {
	public static initialize(API_URL: string, AUTH_TOKEN_URL: string): AuthCore {
		AuthCore.instance ||= new AuthCore(API_URL, AUTH_TOKEN_URL);
		return AuthCore.instance;
	}

	public static getInstance(): AuthCore {
		if (!AuthCore.instance) {
			throw new Error('AuthCore is not initialized. Call initialize() first.');
		}

		return AuthCore.instance;
	}


	private static instance: AuthCore | undefined = undefined;

	public apiUrl: string;
	public authTokenUrl: string;

	private token: string | undefined = undefined;

	private constructor(apiUrl: string, authTokenUrl: string) {
		this.apiUrl = apiUrl;
		this.authTokenUrl = authTokenUrl;
	}

	public async login(): Promise<void> {
		const url = `${this.apiUrl}/${this.authTokenUrl}`;
		const options = {
			method: 'GET',
		};

		const response: Response = await fetch(url, options);

		if (!response.ok) {
			throw new Error('Login failed');
		}

		const { data } = await response.json();
		this.token = data;
	}

	public getToken(): string | undefined {
		return this.token;
	}
}
