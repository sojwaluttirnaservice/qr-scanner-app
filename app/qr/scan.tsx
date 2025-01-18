import React, { useEffect } from 'react';
import { Button, View, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanQrPage = () => {
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.CAMERA); // For Android
    //   const result = await check(PERMISSIONS.IOS.CAMERA); // For iOS

      if (result === RESULTS.GRANTED) {
        console.log('Permission granted');
      } else {
        requestPermissions();
      }
    } catch (err) {
      console.error('Error checking permission', err);
    }
  };

  const requestPermissions = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA); // For Android
      // const result = await request(PERMISSIONS.IOS.CAMERA); // For iOS

      if (result === RESULTS.GRANTED) {
        console.log('Permission granted');
      } else {
        Alert.alert('Permission Denied', 'Camera access is required to scan QR codes');
      }
    } catch (err) {
      console.error('Error requesting permission', err);
    }
  };

  const handleScan = (e: any) => {
    Alert.alert('QR Code Scanned', `Data: ${e.data}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCodeScanner onRead={handleScan} />
      <Button title="Start Scanning" onPress={checkPermissions} />
    </View>
  );
};

export default ScanQrPage;
