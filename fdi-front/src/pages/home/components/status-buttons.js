import {useState} from "react";
import axios from "axios";

export function StatusButtons({groupStatus, groupId}) {
    const [status, setStatus] = useState(groupStatus);

    async function approve(e) {
        e.preventDefault();
        await axios.put(`/groups/${groupId}/approved`)
        setStatus("approved")
    }

    async function decline(e) {
        e.preventDefault();
        await axios.put(`/groups/${groupId}/declined`)
        setStatus("declined");
    }

    return (
        <div>
            {status === "pending" ? (
                    <div>
                        <a href="#" onClick={approve}
                           className="bg-green-500 rounded p-2 mt-2 text-white hover:bg-green-400 duration-200 text-xs mr-1">Approve</a>
                        <a href="#" onClick={decline}
                           className="bg-red-500 rounded p-2 text-white hover:bg-red-400 duration-200 text-xs">Decline</a>
                    </div>
                ) :
                (<label
                    className={"text-semibold px-2 py-1 text-white rounded-md " + (status === "approved" ? "bg-green-600" : "bg-red-500")}>{status}</label>)}
        </div>
    )
}