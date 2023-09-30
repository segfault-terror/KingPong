import Input, { InputType } from './Input';
import { useState } from 'react';

export default function CreateNewChannel() {
    const [visibility, setVisibility] = useState('public');

    return (
        <form
            className="text-white accent-secondary-200
                        flex flex-col gap-4 font-jost"
        >
            <h1 className="text-secondary-200 text-center text-2xl mb-4">
                Create new channel
            </h1>

            <Input placeholder="Channel name" />

            <div>
                <div className="flex justify-start gap-1">
                    <input
                        type="radio"
                        name="visibility"
                        id="public"
                        className="peer"
                        onClick={() => setVisibility('public')}
                        required
                    />
                    <label
                        htmlFor="public"
                        className="peer-checked:text-secondary-200"
                    >
                        Public
                    </label>
                </div>

                <div className="flex justify-start gap-1">
                    <input
                        type="radio"
                        name="visibility"
                        id="private"
                        className="peer"
                        onClick={() => setVisibility('private')}
                        required
                    />
                    <label
                        htmlFor="private"
                        className="peer-checked:text-secondary-200"
                    >
                        Private
                    </label>
                </div>

                <div className="flex justify-start gap-1">
                    <input
                        type="radio"
                        name="visibility"
                        id="protected"
                        className="peer"
                        onClick={() => setVisibility('protected')}
                        required
                    />
                    <label
                        htmlFor="protected"
                        className="peer-checked:text-secondary-200"
                    >
                        Protected
                    </label>
                </div>
            </div>

            <div className={visibility === 'protected' ? 'block' : 'hidden'}>
                <Input
                    placeholder="Channel Password"
                    type={InputType.PASSWORD}
                />
            </div>

            <button
                className="bg-secondary-200
                            text-background
                            font-bold
                            w-40 py-1
                            rounded-2xl
                            self-center"
                onClick={(e) => e.preventDefault()}
            >
                Create channel
            </button>
        </form>
    );
}
