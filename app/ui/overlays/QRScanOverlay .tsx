import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const QRScanOverlay = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const squareSize = 300; // Size of the square in the middle

    return (
        <View style={styles.overlay}>
            {/* Dark background */}
            <View style={styles.overlayBackground}></View>

            {/* Transparent square in the middle */}
            <View
                style={[
                    styles.transparentSquare,
                    {
                        width: squareSize,
                        height: squareSize,
                        top: (screenHeight - squareSize) / 2,
                        left: (screenWidth - squareSize) / 2,
                    },
                ]}
            />

            {/* Top Left Corner */}
            <View
                style={[
                    styles.corner,
                    {
                        top: (screenHeight - squareSize) / 2 - 20,
                        left: (screenWidth - squareSize) / 2 - 20,
                    },
                ]}
            />
            {/* Top Right Corner */}
            <View
                style={[
                    styles.corner,
                    {
                        top: (screenHeight - squareSize) / 2 - 20,
                        right: (screenWidth - squareSize) / 2 - 20,
                    },
                ]}
            />
            {/* Bottom Left Corner */}
            <View
                style={[
                    styles.corner,
                    {
                        bottom: (screenHeight - squareSize) / 2 - 20,
                        left: (screenWidth - squareSize) / 2 - 20,
                    },
                ]}
            />
            {/* Bottom Right Corner */}
            <View
                style={[
                    styles.corner,
                    {
                        bottom: (screenHeight - squareSize) / 2 - 20,
                        right: (screenWidth - squareSize) / 2 - 20,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    },
    transparentSquare: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent square
        borderWidth: 3,
        borderColor: '#ffffff', // White border
        zIndex: 1, // Ensure it is above the dark overlay
    },
    corner: {
        position: 'absolute',
        width: 30,
        height: 30,
        backgroundColor: '#ffffff', // White color for corner edges
        zIndex: 2, // Ensure corners are above other layers
    },
});

export default QRScanOverlay;
