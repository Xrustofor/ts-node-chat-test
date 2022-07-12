export interface IUsersTokenService {
	generateTokens: (login: string, id: number) => { accessToken: string; refreshToken: string };
	saveToken: (id: number, token: string) => void;
}
