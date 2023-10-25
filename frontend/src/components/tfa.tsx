import Modal from '@/app/chat/Modal';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function TFA() {
    const [toggle, setToggle] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleVerify = (e: any) => {
    }

	// const {data, isLoading, error }= useMutation({
	// 	mutationKey: ['verify'],
	// 	mutationFn: async () => {
	// 		try {
	// 			const { data } = await axios.post(`/api/auth/2fa/generate`, {
	// 				code: code,
	// 			});
	// 			return data;
	// 		} catch (err) {
	// 			return err;
	// 		}
	// 	},
	// })

	// const qrcode = data;
	// console.log

    return (
        <Modal
            onClose={() => {
                setToggle(false);
            }}
        >
            <div className="w-96 flex justify-center items-center text-2xl font-jost">
                Two-Factory authentication{' '}
                <img src={'/images/lock.svg'} alt="lock" />
            </div>
            <div className="w-96 h-96 bg-primary rounded-2xl">
                <div className="flex flex-col">
                    <div className='justify-center flex items-center'>scan the qrCode with app authenticator</div>
                    <div className="w-56 h-56 bg-black rounded-xl m-auto"><img src={""} alt="" /></div>
                    <Form onSubmit={handleVerify}>
                        <Form.Group
                            controlId="formNumberCode"
                            className="flex flex-col"
                        >
                            <Form.Label
                                htmlFor="code"
                                className="text-white text-sm font-medium mt-2 flex items-start justify-start w-56 m-auto"
                            >
                                <p className="text-red-600">*</p>Authentication
                                code
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="code"
                                name="code"
                                value={code}
                                placeholder="Enter 6 digit code"
                                required
                                onChange={handleCodeChange}
                                className="w-56 h-10 rounded-lg border-2 text-black border-gray-300 mt-2 m-auto"
                            />
                            <button
                                type="submit"
								onSubmit={(e) => handleVerify(e)}
                                className="bg-green-500 text-black font-medium rounded-lg w-40 h-10 mt-4 m-auto"
                            >
                                Verify
                            </button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}
