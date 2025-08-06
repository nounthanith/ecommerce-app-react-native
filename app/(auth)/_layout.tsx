import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{
          title: 'Sign In',
          headerTitleAlign: 'center',
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{
          title: 'Create Account',
          headerTitleAlign: 'center',
        }} 
      />
    </Stack>
  );
}
