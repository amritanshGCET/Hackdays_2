import { useContext, useState } from 'react';
import { Icons } from '../components/Icons';
import { ApiContext } from '../contexts/ApiContext';

export function MyApis() {
  const { apis } = useContext(ApiContext);
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const copyEndpoint = async (api) => {
    if (!api.endpoint) return;
    await navigator.clipboard.writeText(api.endpoint);
    setCopiedId(api.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My APIs</h1>
      {apis.length === 0 ? (
        <div className="bg-white dark:bg-[#1c1c1c] rounded-2xl border border-gray-200 dark:border-gray-800 p-8 text-center shadow-sm">
          <div className="text-gray-400 dark:text-gray-600 flex justify-center mb-4"><Icons.Code /></div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No APIs generated yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Head back to the home page to prompt your first backend!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {apis.map((api) => (
            <article key={api.id} className={`group relative overflow-hidden bg-white dark:bg-[#1c1c1c] rounded-2xl border p-6 shadow-sm transition-all duration-300 ${expandedId === api.id ? 'border-[#D9522C]/60 shadow-lg -translate-y-0.5' : 'border-gray-200 dark:border-gray-800 hover:border-[#D9522C]/40 hover:-translate-y-0.5 hover:shadow-md'}`}>
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#D9522C] to-orange-300" />
              <div className="flex items-start justify-between gap-4 pl-2">
                <button type="button" onClick={() => setExpandedId(expandedId === api.id ? null : api.id)} className="min-w-0 text-left" aria-expanded={expandedId === api.id}>
                  <div className="mb-2 flex items-center gap-2"><span className="rounded-lg bg-[#D9522C]/10 p-2 text-[#D9522C]"><Icons.Code /></span><p className="text-xs font-bold uppercase tracking-wider text-gray-400">Generated API</p></div><p className="text-gray-900 dark:text-gray-100">{api.prompt}</p>
                </button>
                <span className="shrink-0 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">{api.status === 'thinking' ? 'Thinking' : api.status === 'creating' ? 'Creating' : 'Generated'}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pl-2"><p className="text-xs text-gray-400">Created {new Date(api.createdAt).toLocaleString()}</p><button type="button" onClick={() => setExpandedId(expandedId === api.id ? null : api.id)} className="text-xs font-semibold text-[#D9522C] hover:underline">{expandedId === api.id ? 'Hide details' : 'View details'}</button></div>
              {expandedId === api.id && (
                <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                  {api.endpoint ? (
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="break-all font-mono text-sm text-gray-500 dark:text-gray-400">{api.endpoint}</p>{api.message && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{api.message}</p>}</div><button type="button" onClick={() => copyEndpoint(api)} className="shrink-0 rounded-lg bg-[#D9522C] px-3 py-2 text-sm text-white hover:bg-[#c44725]">{copiedId === api.id ? 'Copied' : 'Copy endpoint'}</button></div>
                  ) : <p className="text-sm text-gray-500 dark:text-gray-400">This API is still being created.</p>}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}