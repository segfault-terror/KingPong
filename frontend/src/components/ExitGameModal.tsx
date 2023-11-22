import Modal from './Modal';

export default function ExitGameModal({
    setExitGameModal,
    setMatchCancel,
}: {
    setExitGameModal: (exitGameModal: boolean) => void;
    setMatchCancel: (matchCancel: boolean) => void;
}) {
    return (
        <Modal
            onClose={() => {
                setExitGameModal(false);
            }}
            childrenClassName="bg-gradient-to-tl to-primary from-background p-6 rounded-2xl border-r-2 border-l-2 border-secondary-500 w-[90%]
			max-w-[400px] h-44 flex justify-center items-center"
        >
            <div className="flex flex-col justify-evenly items-center   w-96 h-48 rounded-lg">
                <div className="text-2xl font-jockey">
                    Are you sure you want to exit?
                </div>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 hover:scale-110 transition-all delay-75 duration-100"
                        onClick={() => {
                            setMatchCancel(true);
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 hover:scale-110 transition-all delay-75 duration-100"
                        onClick={() => {
                            setExitGameModal(false);
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </Modal>
    );
}
