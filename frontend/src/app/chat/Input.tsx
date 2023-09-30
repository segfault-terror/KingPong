export enum InputType {
    TEXT = 'text',
    PASSWORD = 'password',
}

type InputProps = {
    placeholder: string;
    type?: InputType;
};

export default function Input({ placeholder, type }: InputProps) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="border-[1px] border-secondary-200 rounded-2xl outline-none
                            bg-background
                            px-4 py-[1px]
                            text-white font-jost
                            w-full"
        />
    );
}
