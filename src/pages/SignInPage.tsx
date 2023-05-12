import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setCurrentUser } from '../redux/user/user.actions'
import Auth from '../components/Auth'
import Input from '../components/Input'
import AuthButton from '../components/AuthButton'
import { Link } from 'react-router-dom'

export default function SignInPage() {
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
		<Auth
			handleSubmit={handleSubmit}
			heading='Welcome back!'
			subHeading='Sign in to your account and continue your journey towards improved productivity.'
		>
			<Input
				type="email" title="Email" id="email"
				placeholder='Youremail@mail.com'
				value={email} error={errors?.email}
				event={handleInput}
			/>

			<Input
				title="Password" id="password"
				value={password}
				error={errors?.password}
				event={handleInput}
				isPassword={true}
			/>

			<div className="form-group">
				<AuthButton loading={loading} title="Sign In" />
				<p>Don't have an account?
					<Link to={"/register"} className='text-blue-600 p-2 underline underline-offset-2 cursor-pointer'>Sign Up</Link>
				</p>
			</div>
		</Auth>
	)
}
