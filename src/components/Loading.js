const Loading = () => {
    return (
        <div id="loading-basic-example" className="h-[300px] w-full">
            <div
                data-te-loading-management-init
                data-te-parent-selector="#loading-basic-example">
                <div
                    data-te-loading-icon-ref
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"></div>
            </div>
            {/* <span data-te-loading-text-ref>Loading...</span> */}
        </div>
    )
}
export default Loading