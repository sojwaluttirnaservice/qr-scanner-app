import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity } from 'react-native';

const CandidateInfo = ({ sourceUrl }: { sourceUrl: string }) => {
    // Extracting query parameters from the source URL if necessary
    const extractQueryParams = (url: string) => {
        const params = new URLSearchParams(new URL(url).search);
        return {
            registrationId: params.get('r'),
            formId: params.get('f'),
        };
    };

    const { registrationId, formId } = extractQueryParams(sourceUrl);

    // Handle the approve action (Placeholder for axios call later)
    const handleApprove = () => {
        console.log('Approve clicked');
        // Add axios call or any other action here later
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.ticket}>
                        {/* Image placeholder for user photo and signature side by side */}
                        <View style={styles.photoAndSignContainer}>
                            {/* User Photo */}
                            <Image
                                style={styles.photo}
                                source={{
                                    uri: 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg',
                                }}
                            />

                            {/* Signature Image */}
                            <Image
                                style={styles.photo}
                                source={{
                                    uri: 'https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg', // Placeholder for signature image
                                }}
                            />
                        </View>

                        <View style={styles.details}>
                            <DetailRow label="Seat No." value="1422" />
                            <DetailRow label="Form No." value={formId || '500003'} />
                            <DetailRow label="Post Name" value="Clerk" />
                            <DetailRow label="Full Name" value="MADHURI VIVEK MEHARE" />
                            <DetailRow label="ENTRY TIME" value="08:00 AM" />
                            <DetailRow label="GATE CLOSE TIME" value="10:30 AM" />
                            <DetailRow
                                label="Exam Date and Time"
                                value="15/12/2024 11:00 AM to 12:30 PM"
                            />
                            <DetailRow
                                label="Exam Center Name and Address"
                                value="VIDYA BHARTI MAHAVIDYALAYA (MAIN BUILDING), CAMP ROAD, AMRAVATI, 444602 (MS)"
                            />
                        </View>
                        {/* <View>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                                ducimus accusantium iste ullam dolores id voluptatem inventore unde
                                placeat beatae minus, rerum animi fugiat, distinctio voluptatum
                                dolorem maiores eligendi iusto! Ratione, amet commodi, provident
                                distinctio magni beatae vero tenetur iste, suscipit exercitationem
                                vel doloremque. Exercitationem nihil inventore qui ab sint omnis
                                consequuntur optio asperiores molestias vel laborum voluptatum
                                quibusdam, ut soluta labore cum id molestiae enim tempore nesciunt
                                cumque incidunt at libero? Quia, magni a. Unde libero laborum
                                ducimus beatae culpa modi distinctio vero? Reiciendis impedit saepe,
                                cumque doloribus et aspernatur delectus, dolores, reprehenderit
                                perferendis mollitia cupiditate laudantium deserunt earum?
                                Voluptatum, quasi numquam reiciendis expedita ad aspernatur
                                explicabo deleniti, excepturi dolor nulla autem quidem nobis
                                reprehenderit quisquam veritatis tempore, incidunt corrupti. Hic
                                atque totam ullam ipsa qui obcaecati repudiandae nemo inventore
                                aspernatur unde explicabo quam debitis illo voluptatem at repellat
                                enim nisi adipisci, esse perspiciatis. Omnis saepe error expedita,
                                eligendi suscipit qui numquam nisi eum, impedit natus dignissimos
                                itaque illum quas assumenda reiciendis inventore veniam, aliquid
                                nobis repellat sapiente voluptas! Reiciendis voluptatem, labore sed
                                itaque facilis ipsum perferendis fugit, saepe laborum sint non
                                deleniti illum eveniet iusto nulla tenetur praesentium officiis odit
                                commodi excepturi, quas placeat laudantium. Minus, earum amet.
                            </Text>
                        </View> */}
                    </View>
                </ScrollView>
            </ScrollView>

            {/* Fixed Approve Button */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
                    <Text style={styles.approveButtonText}>Approve</Text>
                </TouchableOpacity>
            </View>
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
    // ticket: {
    //     width: '100%',
    //     backgroundColor: '#fff',
    //     padding: 20,
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.2,
    //     shadowRadius: 4,
    //     marginTop: 1,
    //     marginBottom: 1,
    //     alignSelf: 'center', // This will center the ticket view horizontally
    // },
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
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 10, // Add some padding to the sides
    },
    photo: {
        width: 120,
        height: 90,
        borderRadius: 5,
        backgroundColor: '#ccc',
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
});

export default CandidateInfo;

// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { Button, ScrollView, StyleSheet, View } from 'react-native';
// import { WebView } from 'react-native-webview';
// import Toast from 'react-native-toast-message';

// // TypeScript: Define the prop types for the component
// interface CandidateInfoProps {
//     sourceUrl: string; // Expect sourceUrl to be a string
// }

// const CandidateInfo: React.FC<CandidateInfoProps> = ({ sourceUrl }) => {
//     const handleMarkAttendance = async () => {
//         try {
//             const parsedUrl = new URL(sourceUrl);
//             const params = new URLSearchParams(parsedUrl.search);

//             const registrationId = params.get('r');
//             const formId = params.get('f');

//             // Simulate an axios request
//             // const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');

//             console.log("marking present here ......................")

//             Toast.show({
//                 type: 'success',
//                 text1: 'Hello',
//                 text2: 'This is something 👋',
//             });
//         } catch (err) {
//             if (err?.response) {
//                 console.error('Axios error:', err?.response);
//             } else {
//                 console.error('Error:', err);
//             }
//         }
//     };

//     // JavaScript code to ensure horizontal and vertical scrolling is enabled
//     const injectedJavaScript = `
//         document.body.style.overflow = 'auto'; // Enable scrolling
//         document.body.style.whiteSpace = 'nowrap'; // Prevent wrapping of content horizontally
//         true; // Ensure the injected JavaScript works
//     `;

//     useEffect(() => {
//         Toast.show({
//             type: 'success',
//             text1: 'App Loaded',
//             text2: 'The app has been initialized',
//         });
//     }, []);

//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollView} style={styles.scrollWrapper}>
//                 <WebView
//                     style={styles.webView}
//                     javaScriptEnabled={true}
//                     domStorageEnabled={true}
//                     source={{ uri: sourceUrl }}
//                     allowsFullscreenVideo={true}
//                     scalesPageToFit={false}
//                     zoomable={true}
//                     bounces={true}
//                     scrollEnabled={true}
//                     injectedJavaScript={injectedJavaScript}
//                 />

//                 <View style={styles.buttonWrapper}>
//                     <Button title="Approve" onPress={handleMarkAttendance} />
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default CandidateInfo;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         width: '100%',
//         height: '100%',
//     },
//     webView: {
//         width: 1000, // Fixed width for web (desktop)
//         height: 900, // Fixed height for web (desktop)
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//     },
//     scrollWrapper: {
//         flex: 1,
//         width: '100%',
//         backgroundColor: 'white',
//     },
//     scrollView: {
//         width: '100%',
//         height: '100%',
//     },
//     buttonWrapper: {
//         marginTop: 'auto',
//         marginBottom: 10,
//     },
// });
