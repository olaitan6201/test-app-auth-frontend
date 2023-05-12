export default function Button({ loading = false , title = ''}: any) {
    return (
        <>
            {loading ? (
                <button
                    type='button'
                    className="px-4 py-2 border bg-blue-500 rounded-md w-full text-white text-center mt-4 cursor-not-allowed flex justify-center items-center"
                    disabled>
                    <img src="/loading.svg" alt="Loading . . ." height={30} width={30} />
                </button>
            ) : (
                <button type='submit' className="px-4 py-2 border bg-blue-600 rounded-md w-full text-white text-center mt-4">{title}</button>
            )}
        </>
    )
}
