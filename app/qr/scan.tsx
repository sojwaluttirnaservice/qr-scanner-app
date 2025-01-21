import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import CryptoJS from 'crypto-js';
import CandidateInfo from '../candidate/info';
import axios from 'axios';

const ScanQrPage = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(false);
    // For capturing hte candndiate photo
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

    const [hallticketData, setHallticketData] = useState(null);

    const [isScanning, setIsScanning] = useState<boolean>(false); // New state for controlling scanning
    useEffect(() => {
        return () => {
            setScannedData(null);
            setIsQRScannerOpen(false);
        };
    }, []);

    // Decrypt function using AES with TypeScript typings
    const decrypt = (encryptedData: string, key: string): string => {
        // Decrypt the data using the AES algorithm and the key
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string (UTF-8)
        return originalText;
    };

    const handleBarcodeScan = async ({ data: barcodeData }) => {
        if (isScanning) return; // Prevent multiple scans
        setIsScanning(true); // Lock scanning
        try {
            setScannedData(barcodeData);
            const { data: _data } = await axios.post(barcodeData);
            setHallticketData(JSON.parse(_data.data));
            setIsQRScannerOpen(false);
        } catch (err) {
            console.log(err);
        } finally {
            setIsScanning(false); // Unlock scanning
        }
    };

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    if (!permission) {
        return (
            <View>
                <Text>This is htis</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {Platform.OS === 'android' ? <StatusBar /> : null}
            {isQRScannerOpen && (
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    onBarcodeScanned={handleBarcodeScan}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.flipButton, styles.scannerButton]}
                            onPress={toggleCameraFacing}>
                            <Text style={[styles.text, styles.scannerButtonText]}>Flip Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.closeButton, styles.scannerButton]}
                            onPress={() => setIsQRScannerOpen(false)}>
                            <Text style={[styles.text, styles.scannerButtonText]}>
                                Close Scanner
                            </Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}

            {/* Render Info component conditionally based on scanned data */}
            {!isQRScannerOpen && scannedData && hallticketData && (
                <CandidateInfo
                    hallticketData={hallticketData}
                    sourceUrl={scannedData}
                    isCameraOpen={isCameraOpen}
                    setIsCameraOpen={setIsCameraOpen}
                />
            )}

            {!isQRScannerOpen && !scannedData && (
                <TouchableOpacity
                    style={styles.scanQRButtonCenter}
                    onPress={() => {
                        setScannedData(null);
                        setIsQRScannerOpen(true);
                    }} // Reset scanned data
                >
                    <Text style={styles.scanQRButtonText}>Scan QR</Text>
                </TouchableOpacity>
            )}

            {/* "Scan Again" Button at the bottom */}
            {!isQRScannerOpen && !isCameraOpen && scannedData && (
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.scanQRButton}
                        onPress={() => {
                            setScannedData(null);
                            setIsQRScannerOpen(true);
                        }} // Reset scanned data
                    >
                        <Text style={styles.scanQRButtonText}>Scan QR</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ScanQrPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Push the content to the top
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    // Button container at the bottom of the screen
    buttonContainer: {
        position: 'absolute',
        bottom: 40, // 20px from the bottom of the screen
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },

    buttonWrapper: {
        marginTop: 'auto', // Push button to the bottom
    },

    scanQRButtonCenter: {
        position: 'absolute', // Position absolutely relative to the container
        top: '50%', // Vertically center the button
        left: '50%', // Horizontally center the button
        transform: [{ translateX: -75 }, { translateY: -75 }], // Adjust to exactly center (half of button size)
        width: 150, // Width of the button
        height: 150, // Height of the button (same as width for a circle)
        borderRadius: 75, // Half of width/height for a full circle
        backgroundColor: '#0ea5e9', // Button background color
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    scanQRButton: {
        backgroundColor: '#0ea5e9',
        paddingVertical: 12, // Vertical padding (top and bottom)
        paddingHorizontal: 30, // Horizontal padding (left and right)
        color: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    scanQRButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 19,
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
    },
    // Styles for both buttons (common)
    scannerButton: {
        paddingVertical: 16, // Vertical padding for appropriate height
        paddingHorizontal: 15, // Horizontal padding for appropriate width
        borderRadius: 25, // Rounded corners
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
        minWidth: 120, // Ensure buttons are at least this wide
    },

    // Flip button with a specific background color
    flipButton: {
        backgroundColor: '#007BFF', // Blue color for flip action
        display: 'none',
    },

    // Close button with a different background color
    closeButton: {
        backgroundColor: '#DC3545', // Red color for close action
    },

    // Text style for both buttons
    text: {
        color: '#FFF',
        fontSize: 14, // Reasonable font size
        fontWeight: '600', // Slightly bold for better visibility
    },

    // Optional, if you want specific text styles for the buttons
    scannerButtonText: {
        color: '#FFF',
    },
});
