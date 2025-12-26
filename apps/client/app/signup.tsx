import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SignUpScreen } from '@romex/ui'; // 공유 패키지 import

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. 회원가입 API 로직
  const handleSignUp = async (email: string, pass: string) => {
    setLoading(true);
    console.log('회원가입 요청:', email, pass);

    // TODO: 실제 API 호출 (예: Axios)
    // await api.auth.signup({ email, password: pass });
    
    setTimeout(() => {
      setLoading(false);
      // 가입 성공 시 로그인 처리 후 메인으로 이동
      // authStore.setToken(...) 
      router.dismissAll();
      router.replace('/(tabs)');
    }, 1500);
  };

  // 2. 로그인 화면 이동 로직
  const handleSignInPress = () => {
    // 스택에서 현재 화면(signup)을 pop하고 signin으로 가는 것이 자연스러울 수 있음
    // 혹은 router.push('/signin')
    router.back(); 
  };

  return (
    <SignUpScreen 
      onSignUp={handleSignUp}
      onSignInPress={handleSignInPress}
      onTermsPress={() => console.log('약관 모달 띄우기')}
      isLoading={loading}
    />
  );
}