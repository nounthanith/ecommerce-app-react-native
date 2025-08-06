import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function Profile() {
  const { user, logout } = useAuth();

  const showToast = (type: 'success' | 'error', text1: string, text2?: string) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.authTitle}>Welcome to Your Profile</Text>
              <Text style={styles.authSubtitle}>Sign in to access your account</Text>
            </View>
            
            <View style={styles.form}>
              <TouchableOpacity 
                style={[styles.button, styles.loginButton]}
                onPress={() => router.push('/(auth)/login')}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>
              
              <TouchableOpacity 
                style={[styles.button, styles.registerButton]}
                onPress={() => router.push('/(auth)/register')}
              >
                <Text style={[styles.buttonText, styles.registerButtonText]}>Create New Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Format the member since date
  const formatMemberSince = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </Text>
            </View>
            <Text style={styles.name}>{user.name || 'User'}</Text>
            <Text style={styles.email}>{user.email || 'No email provided'}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <MaterialIcons name="phone" size={20} color="#4a80f5" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Phone Number</Text>
                <Text style={styles.detailValue}>{user.phone || 'Not provided'}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <MaterialIcons name="person" size={20} color="#4a80f5" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Role</Text>
                <Text style={[styles.detailValue, styles.role]}>
                  {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                </Text>
              </View>
            </View>
            
            <View style={[styles.detailItem, { borderBottomWidth: 0 }]}>
              <View style={styles.detailIconContainer}>
                <MaterialIcons name="calendar-today" size={20} color="#4a80f5" />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Member Since</Text>
                <Text style={styles.detailValue}>
                  {user.createdAt ? formatMemberSince(user.createdAt) : 'N/A'}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={() => {
              // Navigate to edit profile screen
              router.push({
                pathname: '/(tabs)/profile',
                params: { user: JSON.stringify(user) }
              });
            }}
          >
            <MaterialIcons name="edit" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={async () => {
              await logout();
              showToast('success', 'Success', 'You have been logged out');
              router.replace('/(auth)/login');
            }}
          >
            <MaterialIcons name="logout" size={20} color="#ff3b30" style={styles.buttonIcon} />
            <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <Toast />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle1: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#f0f7ff',
    top: -width * 0.7,
    right: -width * 0.5,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: '#e1f0ff',
    bottom: -width * 0.3,
    left: -width * 0.2,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#4a80f5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#4a80f5',
  },
  editButton: {
    backgroundColor: '#4a80f5',
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4a80f5',
    shadowColor: 'transparent',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
    shadowColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButtonText: {
    color: '#4a80f5',
  },
  logoutButtonText: {
    color: '#ff3b30',
  },
  buttonIcon: {
    marginRight: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e9ecef',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#95a5a6',
    fontSize: 12,
    fontWeight: '500',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#4a80f5',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#4a80f5',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  detailItem: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(74, 128, 245, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '500',
  },
  role: {
    color: '#4a80f5',
    textTransform: 'capitalize',
  },
});