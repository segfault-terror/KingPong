import Input, { InputType } from './Input';

export default function CreateNewChannel() {
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
                    />
                    <label
                        htmlFor="protected"
                        className="peer-checked:text-secondary-200"
                    >
                        Protected
                    </label>
                </div>
            </div>

            <Input placeholder="Channel Password" type={InputType.PASSWORD} />

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
