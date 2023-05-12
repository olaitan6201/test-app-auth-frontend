import { User } from "../redux/types";

export default function ProfilePage({ user }: { user: User }) {
  const { name, email } = user
  return (
    <div className="mt-5 max-w-6xl flex justify-center items-center mx-auto">
      <h1 className="text-4xl">Welcome, {`${email} - ${name}`}</h1>
    </div>
  )
}
