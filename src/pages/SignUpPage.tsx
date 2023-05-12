import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setCurrentUser } from '../redux/user/user.actions'
import Auth from '../components/Auth'

export default function SignUpPage() {
	const [viewPassword, setViewPassword] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(true)
	const [errors, setErrors] = useState({ email: "", password: "" })
	const dispatch = useDispatch()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const url = process.env.REACT_APP_API_BASE_URL || ''
		if (url.trim().length === 0) return toast.error('Url not found');
		if (email.trim().length === 0) return setErrors({ ...errors, email: "This field is required" })
		if (password.trim().length === 0) return setErrors({ ...errors, password: "This field is required" })
		setLoading(true)
		try {
			const res = await axios.post(`${url}/login`, { email, password })

			const { message, data } = res.data

			const { user, token, uid } = data

			dispatch(setCurrentUser(user))

			localStorage.setItem('API_TOKEN', token)
			localStorage.setItem('USER_ID', uid)

			toast.success(message)

		} catch (error: any) {
			const { status, data } = error.response
			switch (status) {
				case 422:
					const errs = data?.errors
					const emailErr = errs?.email ? errs.email[0] : ""
					const passwordErr = errs?.password ? errs.password[0] : ""
					setErrors({ ...errors, email: emailErr, password: passwordErr })
					break;

				default:
					toast.error(data?.message)
					break;
			}
		} finally {
			setLoading(false)
		}
	}

	const handleInput = (e: any) => {
		const { id, value } = e.target

		switch (id) {
			case 'email':
				setEmail(value)
				setErrors({ ...errors, email: "" })
				break;

			case 'password':
				setPassword(value)
				setErrors({ ...errors, password: "" })
				break;

			default:
				break;
		}
	}

	useEffect(() => setLoading(false), [])

	return (
		<Auth handleSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="email">Email</label>
				<div className="form-control">
					<input
						type="email" id="email"
						className="input w-full"
						placeholder="Youremail@mail.com"
						value={email}
						onChange={handleInput}
					/>
				</div>
				{errors?.email?.trim().length > 0 && <small className="text-red-600">{errors?.email}</small>}
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<div className="form-control flex justify-between items-center space-x-2">
					<input
						type={`${viewPassword ? 'text' : 'password'}`}
						id="password" className="input flex-grow"
						placeholder="••••••"
						value={password}
						onChange={handleInput}
					/>
					{viewPassword ? (
						<AiOutlineEyeInvisible className="text-xl cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
					) : (
						< AiOutlineEye className="text-xl cursor-pointer" onClick={() => setViewPassword(!viewPassword)} />
					)}

				</div>
				{errors?.password?.trim().length > 0 && <small className="text-red-600">{errors?.password}</small>}
			</div>
			<div className="form-group">
				{loading ? (
					<button
						type='button'
						className="px-4 py-2 border bg-blue-500 rounded-md w-full text-white text-center mt-4 cursor-not-allowed flex justify-center items-center"
						disabled>
						<img src="/loading.svg" alt="Loading . . ." height={30} width={30} />
					</button>

				) : (
					<button type='submit' className="px-4 py-2 border bg-blue-600 rounded-md w-full text-white text-center mt-4">Sign In</button>
				)}
			</div>
		</Auth>
	)
}
