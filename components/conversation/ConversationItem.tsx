'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import axios from 'axios';
import qs from 'query-string';

import Image from 'next/image';
import { cn } from '@/lib/utils';

import { Crown, Edit, FileIcon, ShieldCheck, Trash } from 'lucide-react';
import { Member, MemberRole, Profile } from '@prisma/client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/UserAvatar';
import { ActionTooltip } from '@/components/ActionTooltip';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

import { useModal } from '@/hooks/useModalStore';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface ConversationItemProps {
    id: string;
    profile: Profile;
    currentProfile: Profile;
    content: string;
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const formSchema = z.object({
    content: z.string().min(1),
});

export const ConversationItem = ({
    id,
    profile,
    currentProfile,
    content,
    timestamp,
    fileUrl,
    deleted,
    isUpdated,
    socketUrl,
    socketQuery,
}: ConversationItemProps) => {
    const { onOpen } = useModal();
    const [isEditing, setIsEditing] = useState(false);

    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                setIsEditing(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content,
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery,
            });

            await axios.patch(url, values);

            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        form.reset({
            content,
        });
    }, [form, content]);

    const fileType = fileUrl?.split('.').pop();

    console.log(currentProfile, profile);

    const isOwner = currentProfile.id === profile.id;

    const canDeleteMessage = !deleted && isOwner;
    const canEditMessage = !deleted && isOwner && !fileUrl;

    const isPDF = fileType === 'pdf' && fileUrl;
    const isImage = fileType !== 'pdf' && fileUrl;

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={profile.imageUrl} className="cursor-default" />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm">{profile.name}</p>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{timestamp}</span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 
                                    overflow-hidden border flex items-center bg-secondary 
                                    h-48 w-48"
                        >
                            <Image src={fileUrl} alt={content} fill className="object-cover" />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-orange-200 stroke-orange-400" />
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-orange-500 dark:text-orange-400 hover:underline"
                            >
                                PDF File
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                'text-sm text-zinc-600 dark:text-zinc-300',
                                deleted && 'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1'
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">(edited)</span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="flex items-center w-full gap-x-2 pt-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        disabled={isLoading}
                                                        className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none 
                                                            border-0 focus-visible:ring-0 focus-visible:ring-offset-0 
                                                            text-zinc-600 dark:text-zinc-200"
                                                        placeholder="Edited message"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button size="sm" variant="orange" disabled={isLoading}>
                                    Save
                                </Button>
                            </form>
                            <span className="text-[10px] mt-1 text-zinc-400">
                                Press escape to cancel, enter to save
                            </span>
                        </Form>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div
                    className="hidden group-hover:flex items-center gap-x-2 absolute p-1 
                        -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm"
                >
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Delete">
                        <Trash
                            onClick={() =>
                                onOpen('deleteMessage', { apiUrl: `${socketUrl}/${id}`, query: socketQuery })
                            }
                            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    );
};
