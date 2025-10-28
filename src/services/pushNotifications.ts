type TokenListener = (token: string) => void;

let currentToken = 'mock-token';
const listeners = new Set<TokenListener>();

const notifyListeners = (token: string) => {
  listeners.forEach((listener) => {
    try {
      listener(token);
    } catch (error) {
      console.warn('Mock push listener failed', error);
    }
  });
};

export const mockPushNotifications = {
  async requestPermission(): Promise<boolean> {
    return true;
  },

  async getToken(): Promise<string> {
    return currentToken;
  },

  onTokenRefresh(listener: TokenListener): () => void {
    listeners.add(listener);
    listener(currentToken);

    return () => {
      listeners.delete(listener);
    };
  },

  simulateTokenRefresh(token: string) {
    currentToken = token;
    notifyListeners(token);
  },
};

export type MockPushNotifications = typeof mockPushNotifications;
