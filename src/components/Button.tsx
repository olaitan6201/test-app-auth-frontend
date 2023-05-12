export default function Button({ title = '', ...props }: any) {
    return (
        <button className="btn" {...props} >{title}</button>
    )
}
