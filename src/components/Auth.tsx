export default function Auth({ handleSubmit, children, heading = '', subHeading = '' }: any) {
    return (
        <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 w-full h-screen">
            <div className="md:col-span-2 lg:col-span-3 object-contain hidden md:inline-grid">
                <img src="/frame.svg" className="object-cover h-screen w-full" alt="" />
            </div>
            <form className="flex-1 md:col-span-2 flex" onSubmit={handleSubmit}>
                <div className="my-auto mx-5">
                    <h1 className="text-2xl font-bold">{heading}</h1>
                    <p className="my-3 text-sm font-medium text-gray-600">{subHeading}</p>

                    <div className="my-3">
                        {children}
                    </div>
                </div>
            </form>
        </div>
    )
}
