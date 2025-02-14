import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';

// import RNPickerSelect from 'react-native-picker-select';

export const uttirnaUrl = `https://uttirna.in`;

const HomePage = () => {
    const [processList, setProcessList] = useState([]);
    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`${uttirnaUrl}/api/get-process-list`);

            const resData = JSON.parse(data.data);

            setProcessList(resData);
        })();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: 'dummyUser', // Set the dummy username
            password: 'dummyPassword123', // Set the dummy password
        },
    });

    const onSubmit = (userData: any) => {
        try {
            // console.log(data);

            // setTimeout(() => {
            console.log('User logged in successfully');
            router.push('/qr/scan');
            // }, 10);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome...</Text>
            <Text style={styles.subHeader}>Login Form</Text>
{/* 
            <Controller
                control={control}
                name="processUrl"
                rules={{ required: 'Username is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                        <RNPickerSelect
                            style={{
                                inputAndroid: styles.input,
                                inputIOS: styles.input,
                            }}
                            onBlur={onBlur}
                            onValueChange={(value) => onChange(value)} // handle change
                            value={value}
                            placeholder={{
                                label: 'Select Username',
                                value: null,
                            }}
                            items={[
                                { label: 'Username 1', value: 'username1' },
                                { label: 'Username 2', value: 'username2' },
                                { label: 'Username 3', value: 'username3' },
                            ]}
                        />
                        {errors.username && (
                            <Text style={styles.error}>{errors.username.message}</Text>
                        )}
                    </View>
                )}
            /> */}

            <Controller
                control={control}
                name="username"
                rules={{ required: 'Username is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.username && (
                            <Text style={styles.error}>{errors.username.message}</Text>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{ required: 'Password is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {errors.password && (
                            <Text style={styles.error}>{errors.password.message}</Text>
                        )}
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '400',
        color: '#555',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 12,
        borderRadius: 6,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    error: {
        color: '#ff4d4d',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        width: '100%',
        backgroundColor: '#3b82f6',
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
