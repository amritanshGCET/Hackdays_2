import { Layout } from './components/Layout';
import { ApiProvider } from './providers/ApiProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { RouterProvider } from './providers/RouterProvider';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ApiProvider>
          <RouterProvider><Layout /></RouterProvider>
        </ApiProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
