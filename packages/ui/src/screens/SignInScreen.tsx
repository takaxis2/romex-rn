import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// 이 컴포넌트들도 packages/ui/src/components 로 이동시켜야 합니다!
import CustomTextInput from '../components/CustomTextInput'; 
import SocialButton from '../components/SocialButton';

// 1. Props 정의: 행동(Action)과 상태(State)를 밖에서 받습니다.
export interface SignInScreenProps {
  onSignIn: (email: string, password: string) => void; // 실제 로그인 로직
  onSignUpPress: () => void;      // 회원가입 화면 이동
  onForgotPasswordPress: () => void; // 비밀번호 찾기 이동
  isLoading?: boolean;            // 로딩 상태는 밖에서 제어
}

export const SignInScreen = ({
  onSignIn,
  onSignUpPress,
  onForgotPasswordPress,
  isLoading = false,
}: SignInScreenProps) => {
  
  // 입력값 관리는 UI 컴포넌트 내부에서 해도 괜찮습니다.
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignInClick = () => {
    onSignIn(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign In</Text>
        
        {/* CustomTextInput에 onChangeText 연결 필요 */}
        <CustomTextInput 
            placeholder="Email" 
            keyboardType="email-address" 
            value={email}
            onChangeText={setEmail}
        />
        <CustomTextInput 
            placeholder="Password" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity onPress={onForgotPasswordPress}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
          onPress={handleSignInClick}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>or</Text>

        {/* 소셜 로그인도 필요하다면 props로 함수를 받아야 합니다 */}
        <SocialButton icon="google" text="Continue with Google" />
        <SocialButton icon="apple" text="Continue with Apple" />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onSignUpPress}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2C35',
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#34D399',
    textAlign: 'right',
    marginVertical: 12,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#34D399',
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#1C2C35',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginVertical: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  link: {
    color: '#34D399',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 0,
  },
  primaryButtonDisabled: {
    backgroundColor: 'rgba(52, 211, 153, 0.5)',
  },
});