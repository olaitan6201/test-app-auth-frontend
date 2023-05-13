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
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	})

	const [loading, setLoading] = useState(true)
	const [errors, setErrors] = useState({ email: "", password: "" })
	const dispatch = useDispatch()

	const { email, password } = formData
	const { email: email_err, password: password_err } = errors

	const handleInput = (e: any) => {
		const { id, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[id]: value
		}))
		setErrors((prevState) => ({
			...prevState,
			[id]: ''
		}))
	}

	const validateFields = (url: string) => {
		if (url.trim().length === 0) return toast.error('Url not found');
		const fieldValues: any = { ...formData }
		for (const field in fieldValues) {
			if (fieldValues[field]?.trim().length === 0)
				return setErrors((prevState) => ({
					...prevState,
					[field]: 'This field is required'
				}))
		}

		return true;
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const url = process.env.REACT_APP_API_BASE_URL || ''
		if (validateFields(url) !== true) return;
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
					const { errors: err } = data
					for (const key in err) {
						setErrors((prevState) => ({
							...prevState,
							[key]: err[key][0]
						}))
					}
					break;

				default:
					toast.error(data?.message)
					break;
			}
		} finally {
			setLoading(false)
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
				value={email} error={email_err}
				event={handleInput}
			/>

			<Input
				title="Password" id="password"
				value={password}
				error={password_err}
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
