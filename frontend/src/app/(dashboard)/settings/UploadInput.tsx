import React from 'react';
import {
    UseFormGetValues,
    UseFormRegister,
    UseFormResetField,
} from 'react-hook-form';
import { SettingInputs } from './page';

export default function UploadInput({
    setImage,
    defaultImage,
    register,
    resetField,
}: {
    setImage: (image: string) => void;
    defaultImage: string;
    register: UseFormRegister<SettingInputs>;
    resetField: UseFormResetField<SettingInputs>;
}) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [fileSelected, setFileSelected] = React.useState(false);
    const { ref: refCall, ...rest } = register('avatar');

    return (
        <>
            <button
                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all"
                onClick={() => inputRef.current?.click()}
                type="button"
            >
                Upload Avatar
            </button>
            <button
                className="font-jost font-bold text-sm text-secondary-200 border border-secondary-200 rounded-3xl
                            px-4 py-2 bg-primary hover:bg-secondary-200 hover:text-background transition-all
                            disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                    if (!inputRef.current) return;
                    resetField('avatar');
                    inputRef.current.value = '';
                    setFileSelected(inputRef.current?.files?.length === 1);
                    setImage(defaultImage || '');
                }}
                {...(fileSelected ? {} : { disabled: true })}
                type="button"
            >
                Reset Avatar
            </button>
            <input
                {...register('avatar', {
                    onChange: () => {
                        setFileSelected(inputRef.current?.files?.length === 1);
                        if (!inputRef.current) return;
                        const file = inputRef.current.files?.[0];
                        if (!file) return;
                        const fileUrl = URL.createObjectURL(file);
                        setImage(fileUrl);
                    },
                })}
                type="file"
                className="hidden"
                ref={(input) => {
                    refCall(input);
                    inputRef.current = input;
                }}
                accept="image/*"
            />
        </>
    );
}
