import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SignInScreen } from '@romex/ui'; // 공유 패키지 사용

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. 로그인 로직 정의
  const handleSignIn = async (email: string, pass: string) => {
    setLoading(true);
    console.log('로그인 시도:', email, pass);
    
    // API 호출 시뮬레이션
    setTimeout(() => {
      setLoading(false);
      // 로그인 성공 시 이동
      router.dismissAll();
      router.replace('/(tabs)');
    }, 1500);
  };

  // 2. 회원가입 이동 로직
  const handleSignUp = () => {
    router.push('/signup');
  };

  // 3. UI 렌더링 + 로직 주입
  return (
    <SignInScreen 
      onSignIn={handleSignIn}
      onSignUpPress={handleSignUp}
      onForgotPasswordPress={() => console.log('비밀번호 찾기')}
      isLoading={loading}
    />
  );
}