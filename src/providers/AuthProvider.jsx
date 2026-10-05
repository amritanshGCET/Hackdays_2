import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const accountsKey = 'api-gen-accounts';
const sessionKey = 'api-gen-user';

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage(sessionKey, null));

  const signIn = async ({ email, password }) => {
    const accounts = readStorage(accountsKey, []);
    const account = accounts.find((item) => item.email === email.trim().toLowerCase() && item.password === password);
    if (!account) throw new Error('No matching account found. Check your email and password.');

    const currentUser = { id: account.id, name: account.name, email: account.email };
    localStorage.setItem(sessionKey, JSON.stringify(currentUser));
    setUser(currentUser);
  };

  const signUp = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readStorage(accountsKey, []);
    if (accounts.some((account) => account.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const newAccount = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password };
    localStorage.setItem(accountsKey, JSON.stringify([...accounts, newAccount]));
    await signIn(newAccount);
  };

  const signOut = async () => {
    localStorage.removeItem(sessionKey);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading: false, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
}