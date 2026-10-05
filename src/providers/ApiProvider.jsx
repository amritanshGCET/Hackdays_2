import { useEffect, useState } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { generateApiMessage } from '../services/gemini';

const storageKey = 'api-gen-prompts';
const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

function readStoredApis() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

export function ApiProvider({ children }) {
  const [apis, setApis] = useState(readStoredApis);
  const [activeApiId, setActiveApiId] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(apis));
  }, [apis]);

  const updateApi = (id, changes) => {
    setApis((currentApis) => currentApis.map((api) => (api.id === id ? { ...api, ...changes } : api)));
  };

  const addApi = async (prompt) => {
    const id = crypto.randomUUID();
    const api = { id, prompt, status: 'thinking', createdAt: new Date().toISOString() };

    setActiveApiId(id);
    setApis((currentApis) => [api, ...currentApis]);

    try {
      await wait(900);
      updateApi(id, { status: 'creating' });
      const [message] = await Promise.all([generateApiMessage(prompt), wait(1300)]);
      updateApi(id, { status: 'ready', message, endpoint: `${window.location.origin}/api/generated/${id}` });
    } catch (error) {
      updateApi(id, { status: 'ready', message: `Your API is ready. Assistant message unavailable: ${error.message}`, endpoint: `${window.location.origin}/api/generated/${id}` });
    }
  };

  const activeApi = apis.find((api) => api.id === activeApiId) || null;

  return <ApiContext.Provider value={{ apis, activeApi, addApi }}>{children}</ApiContext.Provider>;
}