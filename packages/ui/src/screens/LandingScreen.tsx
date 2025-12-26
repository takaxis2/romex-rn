import React, { useCallback, useEffect, useRef } from 'react';
import { BackHandler, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, Platform } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router'; // 삭제: UI 패키지는 라우터를 몰라야 합니다.

// Props 인터페이스 정의
export interface LandingScreenProps {
  onSignUp: () => void;
  onSignIn: () => void;
  backgroundImageUrl?: string; // 이미지도 선택 가능하게 변경 (선택사항)
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const LandingScreen = ({ 
  onSignUp, 
  onSignIn,
  backgroundImageUrl = 'https://images.unsplash.com/photo-1548690312-e3b507d8c110' 
}: LandingScreenProps) => {
  // const router = useRouter(); // 삭제

  // Animation values
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);
  const footerOpacity = useSharedValue(0);
  const footerTranslateY = useSharedValue(20);

  useEffect(() => {
    // Start animations
    contentOpacity.value = withTiming(1, { duration: 800 });
    contentTranslateY.value = withTiming(0, { duration: 800 });

    footerOpacity.value = withDelay(200, withTiming(1, { duration: 1000 }));
    footerTranslateY.value = withDelay(200, withTiming(0, { duration: 1000 }));
  }, []);

  // 뒤로가기 로직 (useFocusEffect는 expo-router에 의존하므로 useEffect로 대체하거나 호출부에서 처리 권장)
  // *주의: useFocusEffect를 쓰려면 @react-navigation/native를 peerDependency로 추가해야 합니다.
  // 여기서는 간단하게 useEffect로 처리하되, 화면이 focus 되었을 때만 작동하는 로직은
  // 실제 앱(Page) 레벨에서 처리하는 것이 더 안전할 수 있습니다. 
  // 일단 기능 유지를 위해 useEffect로 유사하게 구현합니다.

  const backPressedOnce = useRef(false);

  useEffect(() => {
    const onBackPress = () => {
      if (backPressedOnce.current) {
        BackHandler.exitApp();
        return false;
      }
  
      backPressedOnce.current = true;
      if (Platform.OS === 'android') {
        ToastAndroid.show('한 번 더 누르면 종료됩니다.', ToastAndroid.SHORT);
      }
  
      setTimeout(() => {
        backPressedOnce.current = false;
      }, 2000);
  
      return true;
    };
  
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, []);

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const animatedFooterStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
    transform: [{ translateY: footerTranslateY.value }],
  }));

  return (
    <ImageBackground
      source={{ uri: backgroundImageUrl }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <AnimatedView style={[styles.contentContainer, animatedContentStyle]}>
          <Text style={styles.title}>지금 바로 여정을 시작하세요</Text>
          <Text style={styles.subtitle}>Start your journey right now</Text>
        </AnimatedView>
        <AnimatedView style={[styles.footer, animatedFooterStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onSignUp} // Props 함수 실행
          >
            <Text style={styles.primaryButtonText}>Create your account for free</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={onSignIn} // Props 함수 실행
           >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </AnimatedView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { color: 'white', fontSize: 24, fontWeight: '600' },
  subtitle: { color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  footer: {
    paddingBottom: 20,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#34D399',
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  primaryButtonText: {
    color: '#1C2C35',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButtonText: {
    color: 'white', fontSize: 16, fontWeight: 'bold'
  },
});