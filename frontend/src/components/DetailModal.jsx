/* eslint-disable react/prop-types */
const DetailModal = ({ data, modal, handleModal }) => {
    const { title, description } = data;
    return (
        <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`${
                modal
                    ? "flex items-center justify-center fixed top-0 right-0 bottom-0 left-0"
                    : "hidden"
            } overflow-y-auto overflow-x-hidden z-50`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-zinc-300 rounded-sm shadow-2xl">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {title}
                        </h3>
                        <button
                            onClick={handleModal}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="default-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
