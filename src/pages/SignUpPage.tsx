import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setCurrentUser } from '../redux/user/user.actions'
import Auth from '../components/Auth'
import Input from '../components/Input'
import Button from '../components/Button'

export default function SignUpPage() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [password_confirmation, setPasswordConfirmation] = useState("")
	const [loading, setLoading] = useState(true)
	const [errors, setErrors] = useState({ name: "", email: "", password: "", password_confirmation: "" })
	const dispatch = useDispatch()

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		const url = process.env.REACT_APP_API_BASE_URL || ''
		if (url.trim().length === 0) return toast.error('Url not found');
		if (name.trim().length === 0) return setErrors({ ...errors, name: "This field is required" })
		if (email.trim().length === 0) return setErrors({ ...errors, email: "This field is required" })
		if (password.trim().length === 0) return setErrors({ ...errors, password: "This field is required" })
		if (password_confirmation.trim().length === 0)
			return setErrors({ ...errors, password_confirmation: "This field is required" })
		if (password_confirmation.trim() !== password.trim())
			return setErrors({ ...errors, password_confirmation: "This field is required" })
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
					const errs = data?.errors
					const emailErr = errs?.email ? errs.email[0] : ""
					const passwordErr = errs?.password ? errs.password[0] : ""
					const passwordConfErr = errs?.password_confirmation ? errs.password_confirmation[0] : ""
					setErrors({ ...errors, email: emailErr, password: passwordErr, password_confirmation: passwordConfErr })
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
			case 'name':
				setName(value)
				setErrors({ ...errors, name: "" })
				break;

			case 'email':
				setEmail(value)
				setErrors({ ...errors, email: "" })
				break;

			case 'password':
				setPassword(value)
				setErrors({ ...errors, password: "" })
				break;

			case 'password_confirmation':
				setPasswordConfirmation(value)
				setErrors({ ...errors, password_confirmation: "" })
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
				type="text" title="Name" id="name" 
				placeholder='Your Name' 
				value={name} error={errors?.name}
				event={handleInput} 
			/>

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

			<Input 
				title="Confirm Password" id="password_confirmation" 
				value={password_confirmation} 
				error={errors?.password_confirmation}
				event={handleInput} 
				isPassword={true}
			/>

			<div className="form-group">
				<Button loading={loading} title="Sign Up" />
			</div>
		</Auth>
	)
}
