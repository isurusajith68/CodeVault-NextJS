"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


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
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {

        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="fileName"
                control={control}
                defaultValue=""
                rules={{ required: 'Please enter a file name' }}
                render={({ field }) => (
                    <input
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

                        onChange={(e) => field.onChange(e.target.files)}
                    />
                )}
            />
            {errors.file && <p>{errors.file.message}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyForm;
