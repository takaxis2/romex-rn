import React from 'react';
import { useRouter } from 'expo-router';
import { LandingScreen } from '@romex/ui'; // UI 패키지에서 import

export default function Index() {
  const router = useRouter();

  const handleSignUp = () => {
    console.log('User App 회원가입 이동');
    router.push('/signup');
  };

  const handleSignIn = () => {
    console.log('User App 로그인 이동');
    router.push('/signin');
  };

  return (
    <LandingScreen 
      onSignUp={handleSignUp} 
      onSignIn={handleSignIn} 
    />
  );
}