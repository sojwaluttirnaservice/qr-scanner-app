import axios from 'axios';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import Svg, { Path } from 'react-native-svg';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Button,
    TouchableOpacity,
    Platform,
} from 'react-native';

const CandidateInfo = ({
    sourceUrl,
    isCameraOpen,
    setIsCameraOpen,
    hallticketData,
}: {
    sourceUrl: string;
    isCameraOpen: Boolean;
    setIsCameraOpen: any;
    hallticketData: any;
}) => {
    const { p: process, ca: candidate, ht: hallticket, slot, s3BucketUrl } = hallticketData;
    // Extracting query parameters from the source URL if necessary
    const extractQueryParams = (url: string) => {
        const params = new URLSearchParams(new URL(url).search);
        return {
            registrationId: params.get('r'),
            formId: params.get('f'),
        };
    };

    const { registrationId, formId } = extractQueryParams(sourceUrl);

    const [permission, requestPermission] = useCameraPermissions();

    const [isPictureTaken, setIsPictureTaken] = useState<boolean>(false);
    const [photoUri, setPhotoUri] = useState<string>(''); // To store the captured photo URI
    const [facing, setFacing] = useState<CameraType>('back'); // To toggle between front and back camera
    const cameraRef = useRef(null); // Reference for the camera

    const [isCandidateApproved, setIsCandidateApproved] = useState(false);
    let [justApproved, setJustApproved] = useState(false);

    useEffect(() => {
        if (hallticket.ca_is_approved != 'NO') {
            setIsCandidateApproved(true);
            setIsPictureTaken(true);
        } else {
            setIsCandidateApproved(false);
            setIsPictureTaken(true);


        }
    }, []);

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

    // Toggle camera between front and back
    const toggleCameraFacing = () => {
        setFacing((prevFacing) => (prevFacing === 'front' ? 'back' : 'front'));
    };

    // Take a picture using the camera
    const handleTakePicture = async () => {
        if (cameraRef.current) {
            const data = await cameraRef.current.takePictureAsync();
            setPhotoUri(data.uri);
            console.log(data);
            setIsPictureTaken(true);
            setIsCameraOpen(false);
        }
    };
    // Retake the picture
    const retakePicture = () => {
        setPhotoUri(null);
        setIsPictureTaken(false);
    };

    // Save the picture (add functionality as needed, e.g., upload or local save)
    const savePicture = () => {
        console.log('Picture saved:', photoUri);
        setIsCameraOpen(false); // Close camera after saving
    };

    // Handle the approve action (Placeholder for axios call later)
    const handleApprove = async () => {
        try {
            let baseUrl = process[0]?.p_form_filling_site;
            let url = `${baseUrl}/api/save-approval-details`;
            const sendData = new FormData();
            sendData.set('rollNo', hallticket.ca_roll_number);
            sendData.set('f_id', hallticket.id);
            sendData.set('r_id', hallticket.ca_reg_id);

            const fileInfo = await FileSystem.readAsStringAsync(photoUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            console.log(photoUri);
            // Convert the base64 data to a binary string or directly send the photo file
            const candidatePhotoFile = {
                uri: photoUri, // URI of the photo
                type: 'image/jpeg', // Specify the file type
                name: 'photo.jpg', // Specify the file name (optional)
            };
            sendData.set('candidatePhoto', candidatePhotoFile);

            // Add axios call or any other action here later

            const { data } = await axios.post(url, sendData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(data);

            const { success } = data;
            if (success) {
                setIsCandidateApproved(true);
                setJustApproved(true);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleApprove3 = async () => {
        try {
            let baseUrl = process[0]?.p_form_filling_site;
            let url = `${baseUrl}/api/save-approval-details`;
            const sendData = new FormData();

            // Add data fields to the FormData
            sendData.set('rollNo', hallticket.ca_roll_number);
            sendData.set('f_id', hallticket.id);
            sendData.set('r_id', hallticket.ca_reg_id);

            // Add the photo as a file using URI (no need to convert it to Base64)
            const candidatePhotoFile = {
                uri: photoUri, // The URI of the image
                type: 'image/jpeg', // MIME type of the file
                name: 'photo.jpg', // The file name
            };

            // Append the photo file to FormData
            sendData.set('candidatePhoto', candidatePhotoFile);

            // Perform the API request
            const { data } = await axios.post(url, sendData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response data:', data); // Log the response from the backend
        } catch (err) {
            console.error('Error uploading photo:', err);
        }
    };

    return (
        <View style={styles.container}>
            {/* For capturing the camera photo */}
            {Platform.OS === 'android' ? <StatusBar /> : null}
            {isCameraOpen && (
                <CameraView style={styles.fullScreenCamera} facing={facing} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.flipButton, styles.scannerButton]}
                            onPress={handleTakePicture}>
                            <Text style={[styles.text, styles.scannerButtonText]}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.closeButton]}
                        onPress={() => setIsCameraOpen(false)}>
                        <Text style={[styles.text, styles.scannerButtonText]}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                width={24} // Smaller size (adjust as needed)
                                height={24} // Smaller size (adjust as needed)
                            >
                                <Path
                                    fill="#FFFFFF"
                                    d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                                />
                            </Svg>
                        </Text>
                    </TouchableOpacity>
                </CameraView>
            )}

            {!isCameraOpen && (
                <>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.ticket}>
                                {/* Image placeholder for user photo and signature side by side */}
                                <View style={styles.photoAndSignContainer}>
                                    {/* User Photo */}
                                    <Image
                                        style={styles.photo}
                                        source={{
                                            uri: `${s3BucketUrl}/${hallticket.ca_photo}`,
                                        }}
                                        //  || 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
                                    />

                                    <TouchableOpacity onPress={() => setIsCameraOpen(true)}>
                                        {/* Caputred image Image */}

                                        {isPictureTaken || isCandidateApproved ? (
                                            <Image
                                                style={styles.photo}
                                                source={{
                                                    // uri: isPictureTaken ? photoUri : captureImagePlaceholder,
                                                    uri:
                                                        photoUri ||
                                                        `${s3BucketUrl}/${hallticket.ca_approved_photo}`,
                                                    // uri: isCandidateApproved
                                                    //     ? `${s3BucketUrl}/${hallticket.ca_approved_photo}`
                                                    //     : photoUri,
                                                }}
                                            />
                                        ) : (
                                            <Image
                                                style={styles.photo}
                                                source={require('../../assets/images/placeholders/capture-image-placeholder-img.jpg')}
                                            />
                                        )}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.signContainer}>
                                    <View style={styles.signWrapper}>
                                        <Image
                                            style={styles.signPhoto}
                                            source={{
                                                uri: `${s3BucketUrl}/${hallticket.ca_sign}`,
                                            }}
                                            //  || 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg'
                                        />
                                    </View>
                                </View>

                                <View style={styles.details}>
                                    <DetailRow label="Seat No." value={hallticket.ca_roll_number} />
                                    <DetailRow label="Form No." value={hallticket.id} />
                                    <DetailRow
                                        label="Post Name"
                                        value={hallticket.ca_post_name?.toUpperCase()}
                                    />
                                    <DetailRow
                                        label="Full Name"
                                        value={`${candidate.ub_first_name} ${candidate.ub_middle_name} ${candidate.ub_last_name}`}
                                    />

                                    <DetailRow
                                        label="Gender"
                                        value={hallticket.ca_gender?.toUpperCase()}
                                    />
                                    <DetailRow label="ENTRY TIME" value={slot.entry_time} />
                                    <DetailRow
                                        label="GATE CLOSE TIME"
                                        value={slot.gate_close_time}
                                    />
                                    <DetailRow
                                        label="Exam Date and Time"
                                        value={`${hallticket.exam_date} ${slot.time}`}
                                    />
                                    <DetailRow
                                        label="Exam Center Name and Address"
                                        value={`${hallticket.ca_center_name}, ${hallticket.ca_center_address}`}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </ScrollView>

                    {/* Fixed Approve Button */}
                    <View style={styles.buttonWrapper}>
                        {!isCandidateApproved ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '100%',
                                }}>
                                <TouchableOpacity
                                    style={[
                                        styles.approveButton,
                                        isPictureTaken ? {} : styles.disabledButton,
                                    ]} // Change style if disabled
                                    onPress={handleApprove}
                                    disabled={!isPictureTaken} // Disable the button if no picture is taken
                                >
                                    <Text
                                        style={[
                                            styles.approveButtonText,
                                            isPictureTaken ? {} : styles.disabledText,
                                        ]}>
                                        Approve
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.snapButton}
                                    onPress={() => setIsCameraOpen(true)}>
                                    <Text style={styles.snapButtonText}>Take Snap</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    width: '100%',
                                }}>
                                <TouchableOpacity
                                    style={[styles.approveButton]} // Change style if disabled
                                >
                                    <Text style={[styles.approveButtonText]}>
                                        This candidate is marked present
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </>
            )}
        </View>
    );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}:</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const SignatureBox = ({ label }: { label: string }) => (
    <View style={styles.signatureBox}>
        <Text>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        // backgroundColor : 'red'
    },

    // CAMERA RELATED STYLES
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    // Full-screen camera
    fullScreenCamera: {
        flex: 1,
        width: '100%', // Ensures it takes full width
        height: '100%', // Ensures it takes full height
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 40, // 20px from the bottom of the screen
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    flipButton: {
        backgroundColor: '#007BFF', // Blue color for flip action
    },

    scannerButton: {
        paddingVertical: 16, // Vertical padding for appropriate height
        paddingHorizontal: 64, // Horizontal padding for appropriate width
        borderRadius: 25, // Rounded corners
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'center', // Center the content vertically
        minWidth: 120, // Ensure buttons are at least this wide
    },

    // Text style for both buttons
    text: {
        color: '#FFF',
        fontSize: 14, // Reasonable font size
        fontWeight: '600', // Slightly bold for better visibility
    },

    // Close button with a different background color
    closeButton: {
        position: 'absolute', // Positions it absolutely within its parent
        top: 10, // Adjust this value to place the button at the top of the parent
        right: 10, // Adjust this value to place the button at the right of the parent
        backgroundColor: '#DC3545', // Red color for close action
        padding: 10, // Adjust padding for better button appearance
        borderRadius: 50, // Optional: round the button for better appearance
        zIndex: 1, // Ensure the button is above other elements if necessary
    },
    // Optional, if you want specific text styles for the buttons
    scannerButtonText: {
        color: '#FFF',
    },
    // -------------------------

    scrollContainer: {
        flexGrow: 1, // Ensure scrollable content takes full available height
        // backgroundColor: 'red',
        paddingBottom: 70, // Add some bottom space to prevent the last item from being hidden behind the button
    },

    scrollView: {
        flex: 1, // This ensures it takes the remaining space
        width: '100%', // Ensures it stretches across the full width
    },
    ticket: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        // borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 2,
        marginTop: 1,
        alignSelf: 'center', // This will center the ticket view horizontally
    },

    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
    details: {
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        marginBottom: 5, // Add space between rows
    },

    signContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 5,
        marginBottom: 5, // Add space between rows
    },
    detailLabel: {
        fontWeight: 'bold',
        flex: 0.4, // Give more space to the label side
        textAlign: 'left', // Ensure label text is aligned to the left
    },
    detailValue: {
        color: '#555',
        flex: 0.6, // The value takes up the remaining space
        flexWrap: 'wrap', // Ensure long text wraps instead of overflowing
        maxWidth: '90%', // Set max width to allow wrapping without overflowing
        textAlign: 'left', // Left-align the value
    },
    photoAndSignContainer: {
        flexDirection: 'row', // This will place the images side by side
        justifyContent: 'space-between',
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 10, // Add some padding to the sides
    },

    photo: {
        width: 150,
        height: 180,
        borderRadius: 5,
        backgroundColor: '#ccc',
    },

    signWrapper: {
        width: 300,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#ccc',
    },
    signPhoto: {
        width: '100%',
        height: '100%',
    },
    signatureSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    signatureBox: {
        width: '45%',
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonWrapper: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    approveButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    approveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    disabledButton: {
        backgroundColor: '#ddd', // Lighter color when disabled
    },

    disabledText: {
        color: '#aaa', // Lighter text color when disabled
    },

    snapButton: {
        backgroundColor: '#14b8a6',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    snapButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CandidateInfo;
