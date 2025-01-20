import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import CandidateInfo from '../candidate/info';

const ScanQrPage = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    const [scannedData, setScannedData] = useState<string | null>(null);
    const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            setScannedData(null);
            setIsQRScannerOpen(false);
        };
    }, []);

    const handleBarcodeScan = ({ data }) => {
        setScannedData('https://mpucb.surbanksassociation.in/print-ht?r=1050004&f=500003');
        setIsQRScannerOpen(false);
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
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setIsQRScannerOpen(false)}>
                            <Text style={styles.text}>Close Scanner</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}

            {/* Render Info component conditionally based on scanned data */}
            {!isQRScannerOpen && scannedData && <CandidateInfo sourceUrl={scannedData} />}

            {/* "Scan Again" Button at the bottom */}
            {!isQRScannerOpen && (
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Scan Again"
                        onPress={() => {
                            setScannedData(null);
                            setIsQRScannerOpen(true);
                        }} // Reset scanned data
                    />
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
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    buttonWrapper: {
        marginTop: 'auto', // Push button to the bottom
    },
});
