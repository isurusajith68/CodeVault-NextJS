"use client"
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../lib/firebase/firebase';
import axios from 'axios';
import DocumentList from '../../../components/DocumentList';
import { toast } from 'react-toastify';



const schema = yup.object().shape({
    fileName: yup
        .string()
        .required('Please enter a file name')
        .min(3, 'File name must be at least 3 characters')
        .max(100, 'File name must be at most 100 characters'),
    file: yup
        .mixed()
        // .required('Please upload a file')
        // .test('required', 'Please upload a file', (value) => {
        //     return value && value.length > 0;
        // })
        .test('fileType', 'Unsupported file type', (value) => {
            if (!value || !value[0]) return true;
            return ['application/pdf'].includes(value[0].type);
        })
        .test('fileSize', 'File too large', (value) => {
            if (!value || !value[0]) return true;
            // 20mb
            return value[0].size <= 20000000;
        }),
    fileUrl: yup.string(),
});



const MyForm = () => {
    const { handleSubmit, formState: { errors, isSubmitting }, control, setValue, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fileName: '',
            file: '',
            fileUrl: '',
        }
    });

    const [editData, setEditData] = React.useState(null);
    const [doc, setDoc] = React.useState(null);


    const onSubmit = async (data) => {

        const { fileName } = data;
        const storageRef = ref(storage, `doc/${data.fileName}`);
        const file = data.file[0];

        if (!editData && !file) {
            toast.error('Please upload a file');
            return;
        }

        if (editData) {
            //if file is not changed
            if (!data.file[0]) {

                //update file name storage
                await renameFile(editData.filename, data.fileName);

                try {
                    const response = await axios.put(`/api/doc/${editData._id}`, { fileName, downloadURL });

                    if (response.data.status === false) {
                        toast.error(response.data.message);
                    }

                    toast.success('File updated successfully');
                    setEditData(null);
                    fetchDocumentList();
                } catch (error) {
                    console.log(error)
                    toast.error('Something went wrong');
                }
            }



            //if file is changed

            //delete old file
            const oldStorageRef = ref(storage, `doc/${editData.filename}`);
            await deleteObject(oldStorageRef);

            //upload new file
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            //update file name and url
            try {
                const response = await axios.put(`/api/doc/${editData._id}`, { fileName, downloadURL });

                if (response.data.status === false) {
                    toast.error(response.data.message);
                }

                toast.success('File updated successfully');
                setEditData(null);
                fetchDocumentList();
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong');
            }
        }


        if (file) {

            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            try {
                const response = await axios.post('/api/doc', { fileName, downloadURL });

                if (response.data.status === false) {
                    toast.error(response.data.message);
                }

                toast.success('File updated successfully');
                fetchDocumentList();
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong');
            }

        }
    };

    const editDataClick = (data) => {
        setValue('fileName', data.filename);
        setValue('fileUrl', data.url);
        setEditData(data);
    }

    const renameFile = async (oldFileName, newFileName) => {
        const oldStorageRef = ref(storage, `doc/${oldFileName}`);
        const newStorageRef = ref(storage, `doc/${newFileName}`);

        //get file from old file name
        const url = await getDownloadURL(oldStorageRef);
        const response = await fetch(url);
        const blob = await response.blob();

        //upload file to new file name
        await uploadBytes(newStorageRef, blob);

        await deleteObject(oldStorageRef)
    }

    const fetchDocumentList = async () => {
        const response = await axios.get('/api/doc');
        setDoc(response.data.data);
    };


    useEffect(() => {
        fetchDocumentList();
    }, [])


    return (
        <div className='flex w-full max-xl:flex-col mt-5 mb-3 gap-10'>
            <div className='flex-1 flex-col'>
                <h1 className='text-2xl font-bold mb-4'>
                    {editData ?
                        "Edit Document" :

                        "Upload Document"
                    }</h1>
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
                        // rules={{ required: 'Please upload a file' }}
                        render={({ field }) => (
                            <input
                                type="file"
                                className='w-full border-2 border-gray-300 rounded-md p-2'
                                onChange={(e) => field.onChange(e.target.files)}
                            />
                        )}
                    />
                    {errors.file && <p>{errors.file.message}</p>}
                    {
                        editData && <Controller
                            name="fileUrl"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    type="url"
                                    className='w-full border-2 border-gray-300 rounded-md p-2'
                                    placeholder="File URL"
                                    readOnly
                                    {...field}
                                />
                            )}
                        />
                    }

                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        disabled={isSubmitting}
                        type="submit">
                        {
                            isSubmitting ? 'Uploading...' : 'Upload'
                        }
                    </button>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        type='reset'
                        onClick={() => { reset(); setEditData(null) }}
                    >
                        Reset Form
                    </button>
                </form>
            </div>
            <div className='flex-1 '>
                <DocumentList editData={(data) => editDataClick(data)} doc={doc} fetchDocumentList={() => fetchDocumentList()} />
                
            </div>
        </div>
    );
};

export default MyForm;
