import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 

import CustomTextInput from '../components/CustomTextInput';
import SocialButton from '../components/SocialButton';

export interface SignUpScreenProps {
  onSignUp: (email: string, password: string) => void; // 회원가입 데이터 전달
  onSignInPress: () => void;      // 로그인 화면 이동
  onTermsPress: () => void;       // 약관 화면 이동 (선택사항)
  isLoading?: boolean;
}

export const SignUpScreen = ({
  onSignUp,
  onSignInPress,
  onTermsPress,
  isLoading = false,
}: SignUpScreenProps) => {
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Checkbox state
  const [agreeEmails, setAgreeEmails] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Basic form validation
  const isFormValid = email.length > 0 && password.length > 0 && password === confirmPassword && agreeTerms;

  const handleSignUpClick = () => {
    if (!isFormValid) {
      // 간단한 알림은 여기서 띄우거나, 에러 상태를 보여주는 방식으로 고도화 가능
      alert('Please fill out the form correctly and agree to the terms of use.');
      return;
    }
    // 부모에게 데이터 전달
    onSignUp(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create your account</Text>
        
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
        <CustomTextInput 
            placeholder="Confirm password" 
            secureTextEntry 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
        />

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeEmails(!agreeEmails)}>
          <View style={[styles.checkbox, agreeEmails && styles.checkboxChecked]}>
            {agreeEmails && <Feather name="check" size={14} color="white" />}
          </View>
          <Text style={styles.checkboxLabel}>I accept to receive emails from GOWOD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeTerms(!agreeTerms)}>
          <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
            {agreeTerms && <Feather name="check" size={14} color="white" />}
          </View>
          <Text style={styles.checkboxLabel}>
            I have read and accept the{' '}
            <Text style={styles.link} onPress={onTermsPress}>Terms of use</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.primaryButton, (!isFormValid || isLoading) && styles.disabledButton]} 
            onPress={handleSignUpClick} 
            disabled={!isFormValid || isLoading}
        >
          <Text style={styles.primaryButtonText}>
            {isLoading ? 'Creating...' : 'Create my account'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>or</Text>

        <SocialButton icon="google" text="Continue with Google" />
        <SocialButton icon="apple" text="Continue with Apple" />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          {/* Link 컴포넌트 대신 TouchableOpacity 사용 */}
          <TouchableOpacity onPress={onSignInPress}>
              <Text style={styles.link}>Sign in</Text>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#34D399',
    borderColor: '#34D399',
  },
  checkboxLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    flexShrink: 1,
  },
  link: {
    color: '#34D399',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#34D399',
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: 'rgba(52, 211, 153, 0.5)',
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
});