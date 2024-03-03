'use client';

import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';

import { UploadDropzone } from '@/lib/uploadthing';

import '@uploadthing/react/styles.css';

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: 'serverImage' | 'messageFile';
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
    const fileType = value?.split('.').pop();

    if (value && fileType !== 'pdf') {
        return (
            <div className="relative h-20 w-20">
                <Image fill alt="Upload" src={value} className="rounded-full" />
                <button
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0"
                    onClick={() => onChange('')}
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    if (value && fileType === 'pdf') {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-orange-200 stroke-orange-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-orange-500 dark:text-orange-400 hover:underline"
                >
                    {value}
                </a>
                <button
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2"
                    onClick={() => onChange('')}
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => onChange(res?.[0].url)}
            onUploadError={(error) => console.log(error)}
            appearance={{
                button: 'bg-orange-500',
                label: 'text-orange-500 hover:text-orange-400',
                uploadIcon: 'text-orange-500',
                container: 'border-dashed border-orange-500',
            }}
        />
    );
};
