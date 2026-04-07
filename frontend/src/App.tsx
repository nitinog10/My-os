import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';

export default function App() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading WebOS...</div>
      </div>
    );
  }

  return isAuthenticated ? <Desktop /> : <LoginScreen />;
}
