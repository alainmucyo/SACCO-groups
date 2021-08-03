import "./submit-button.css";

export function SubmitButton({text, loading = false, loading_text}) {
    return (
        <button disabled={loading}
                className={`bg-blue-600 disabled:bg-blue-400  hover:bg-blue-500
                            duration-100 py-2.5 text-center focus:rotate-2 focus:ring-purple-600
                            focus:ring-opacity-50 font-semibold px-3 ${!loading ? 'px-6' : ''} md:py-2 float-right
                            text-white rounded leading-tight text-xl md:text-base font-sans mt-4
                            font-medium tracking-wide ${loading ? 'cursor-wait' : ''} `}
        >
            {loading ? <span className="spinner-border spinner-border-sm mr-1"/> : ''}
            {loading ? loading_text : text}
        </button>
    )
}