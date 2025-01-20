import { Stack } from 'expo-router';
// import Toast from 'react-native-toast-message';
const RootLayout = () => {
    return (
        <>
          
            <Stack>
                <Stack.Screen name="index"></Stack.Screen>
                <Stack.Screen name="qr/scan"></Stack.Screen>
                <Stack.Screen name="candidate/info"></Stack.Screen>
            </Stack>
        </>
    );
};

export default RootLayout;
