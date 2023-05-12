export default function AuthButton({ loading = false, title = '', ...props }: any) {
    return (
        <>
            {loading ? (
                <button
                    type='button'
                    className="px-4 py-2 border bg-blue-500 rounded-md w-full text-white text-center mt-4 cursor-not-allowed flex justify-center items-center"
                    disabled {...props}>
                    <img src="/loading.svg" alt="Loading . . ." height={30} width={30} />
                </button>
            ) : (
                <button type='submit' className="btn mt-4 w-full text-white  bg-blue-600" {...props}>{title}</button >
            )}
        </>
    )
}
