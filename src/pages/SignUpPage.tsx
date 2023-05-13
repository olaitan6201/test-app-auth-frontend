import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setCurrentUser } from '../redux/user/user.actions'
import Auth from '../components/Auth'
import Input from '../components/Input'
import AuthButton from '../components/AuthButton'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	})

	const [loading, setLoading] = useState(true)
	const [errors, setErrors] = useState({ name: "", email: "", password: "", password_confirmation: "" })
	const dispatch = useDispatch()

	const { name, email, password, password_confirmation } = formData
	const { name: name_err, email: email_err, password: password_err, password_confirmation: password_confirmation_err } = errors

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
		if (password_confirmation.trim() !== password.trim())
			return setErrors({ ...errors, password_confirmation: "Password confirmation failed!" })

		return true;
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const url = process.env.REACT_APP_API_BASE_URL || ''
		if (validateFields(url) === true) {
			setLoading(true)
			try {
				const res = await axios.post(`${url}/register`, { name, email, password, password_confirmation })

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
	}

	useEffect(() => setLoading(false), [])

	return (
		<Auth
			handleSubmit={handleSubmit}
			heading='Sign Up!'
			subHeading='Sign up now to start your journey towards improved productivity.'
		>
			<Input
				type="text" title="Name" id="name"
				placeholder='Your Name'
				value={name} error={name_err}
				event={handleInput}
			/>

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

			<Input
				title="Confirm Password" id="password_confirmation"
				value={password_confirmation}
				error={password_confirmation_err}
				event={handleInput}
				isPassword={true}
			/>

			<div className="form-group">
				<AuthButton loading={loading} title="Sign Up" />

				<p>Already have an account?
					<Link to={"/login"} className='text-blue-600 p-2 underline underline-offset-2 cursor-pointer'>Sign In</Link>
				</p>
			</div>
		</Auth>
	)
}
