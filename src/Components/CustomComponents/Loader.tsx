import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { AppColors, multiThemeColor } from '../../utils/AppConstants';

interface LoaderHookResult {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  Loader: React.FC;
}

const useLoader = (): LoaderHookResult => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  const Loader: React.FC = () => (
    <View style={styles.loaderContainer}>
      <LoaderKit
        style={{ width: 50, height: 50 }}
        name={'BallClipRotateMultiple'}
        color={AppColors.primaryColor.mainContent}
      />
    </View>
  );

  return {
    isLoading,
    showLoader,
    hideLoader,
    Loader,
  };
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default useLoader;
