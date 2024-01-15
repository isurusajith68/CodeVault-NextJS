"use server"
import { getStorage, getFirebase, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { getFirebase } from './firebase'; // Replace with the path to your Firebase initialization module

const firebase = getFirebase(); // Initialize Firebase
const storage = getStorage(firebase); // Initialize Firebase Storage

export const uploadImage = async (restaurantId, image) => {
    const filePath = `images/${restaurantId}/${image.name}`;
    const newImageRef = ref(storage, filePath);
    await uploadBytesResumable(newImageRef, image);

    return await getDownloadURL(newImageRef);
};