import axios from 'axios'
import { useEffect, useState } from "react";
import AuthButton from "../components/AuthButton";
import { User } from "../redux/types";
import { toast } from "react-toastify";
import { authHeader } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.actions';

export default function ProfilePage({ user }: { user: User }) {
  const { name, email } = user
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => setLoading(false), [])

  const userLogOut = () => {
    const user: User = {
      name: "",
      email: "",
      created_at: ""
    }

    dispatch(setCurrentUser(user))
    localStorage.setItem('API_TOKEN', "")
    localStorage.setItem('USER_ID', "")
  }

  const logOut = async () => {
    setLoading(true)
    try {
      const url = process.env.REACT_APP_API_BASE_URL || ''
      let res = await axios({
        method: 'post',
        url: `${url}/logout`,
        timeout: 8000,
        headers: authHeader()
      })

      const { message } = res.data
      toast.success(message)
      userLogOut()
    } catch (error: any) {
      const { status, data } = error.response
      switch (status) {
        case 400:
          userLogOut()
          break;

        case 401:
          userLogOut()
          break;

        default:
          break;
      }
      toast.error(data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-5 max-w-6xl flex justify-center items-center mx-auto flex-col">
      <h1 className="text-4xl">Welcome, {`${email} - ${name}`}</h1>
      <AuthButton loading={loading} title='Sign Out' className="shadow-md btn delay-200 hover:brightness-110 transition-brightness" onClick={logOut} />
    </div>
  )
}
