export interface AuthModel {
    isAuthenticated: any;
    loginUsername: string;
    loginPassword: string;
    setLoginUsername: (username: string) => void;
    setLoginPassword: (password: string) => void;
    handleLogin: (e: React.FormEvent) => void;
    handleLogout: () => void;
}