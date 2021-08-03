export function FormInput({label,type="text", changed}) {
    function change(e) {
        changed(e.target.value)
    }

    return (
        <div>
            <div className="w-full">
                <label className="text-gray-600 inline-block mb-1">{label}</label>
                <input
                    type={type}
                    onInput={event => change(event)}
                    required
                    placeholder={label}
                    className="text-sm sm:text-base relative bg-white w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2.5 px-4"/>
            </div>
        </div>
)
}