"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../lib/firebase/firebase';
import axios from 'axios';
import DocumentList from '../../../components/DocumentList';
import { toast } from 'react-toastify';
const schema = yup.object().shape({
    fileName: yup
        .string()
        .required('Please enter a file name')
        .min(3, 'File name must be at least 3 characters')
        .max(20, 'File name must be at most 20 characters'),
    file: yup
        .mixed()
        .required('Please upload a file')
        .test('required', 'Please upload a file', (value) => {
            return value && value.length > 0;
        })
        .test('fileType', 'Unsupported file type', (value) => {
            if (!value || !value[0]) return true;
            return ['application/pdf'].includes(value[0].type);
        })
        .test('fileSize', 'File too large', (value) => {
            if (!value || !value[0]) return true;
            return value[0].size <= 2000000;
        }),
});

const MyForm = () => {
    const { handleSubmit, formState: { errors, isSubmitting }, control } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const { fileName } = data;
        const storageRef = ref(storage, `doc/${data.fileName}`);
        const file = data.file[0];

        if (file) {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const response =await axios.post('/api/doc', { fileName, downloadURL });

            if (response.status === 200) {
               toast.success('File uploaded successfully');
            }
        }
    };

    return (
        <div className='flex w-full max-xl:flex-col mt-5 mb-3 gap-10'>
            <div className='flex-1 flex-col'>
                <h1 className='text-2xl font-bold mb-4'>Upload a file</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full'>
                    <Controller
                        name="fileName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Please enter a file name' }}
                        render={({ field }) => (
                            <input
                                className='w-full border-2 border-gray-300 rounded-md p-2'
                                type="text"
                                {...field}
                                placeholder="Enter file name"
                            />
                        )}
                    />
                    {errors.fileName && <p>{errors.fileName.message}</p>}
                    <Controller
                        name="file"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Please upload a file' }}
                        render={({ field }) => (
                            <input
                                type="file"
                                className='w-full border-2 border-gray-300 rounded-md p-2'
                                onChange={(e) => field.onChange(e.target.files)}
                            />
                        )}
                    />
                    {errors.file && <p>{errors.file.message}</p>}
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        disabled={isSubmitting}
                        type="submit">
                            {
                                isSubmitting ? 'Uploading...' : 'Upload'
                            }
                        </button>
                </form>
            </div>
            <div className='flex-1 '>
                <DocumentList />
            </div>
        </div>
    );
};

export default MyForm;
