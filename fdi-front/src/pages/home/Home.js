import {useEffect, useState} from "react";
import axios from "axios";
import {StatusButtons} from "./components/status-buttons";

export function Home() {
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        axios.get("/groups").then(({data}) => {
            setGroups(data)
        });
    }, [])
    return (
        <div className="flex justify-center py-6 px-3">
            <div className="lg:w-1/2 w-full bg-white rounded p-4 shadow">
                <h1 className="text-gray-700 text-2xl tracking-wide">Welcome,</h1>
                <h3 className="text-gray-800 text-lg tracking-wide mb-4">Here are available groups</h3>
                <div className="table w-full p-2">
                    <table className="w-full border border-gray-100">
                        <thead>
                        <tr className="border-b border-gray-100">

                            <th className="p-2 border-gray-100 cursor-pointer text-sm text-gray-400">
                                <div className="flex items-center justify-center">
                                    ID
                                </div>
                            </th>
                            <th className="p-2 border-gray-100 cursor-pointer text-sm text-gray-400">
                                <div className="flex items-center justify-center">
                                    Name
                                </div>
                            </th>
                            <th className="p-2 border-gray-100 cursor-pointer text-sm text-gray-400">
                                <div className="flex items-center justify-center">
                                    Phone Number
                                </div>
                            </th>
                            <th className="p-2 border-gray-100 cursor-pointer text-sm text-gray-400">
                                <div className="flex items-center justify-center">
                                    Created At
                                </div>
                            </th>
                            <th className="p-2 border-gray-100 cursor-pointer text-sm text-gray-400">
                                <div className="flex items-center justify-center">
                                    Action
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {groups.map(({id, name, phone_number, created_at, status}) => {
                            return (<tr key={id} className="text-center border-b border-gray-100 text-sm text-gray-600">
                                <td className="p-2">{id}</td>
                                <td className="p-2">{name}</td>
                                <td className="p-2">{phone_number}</td>
                                <td className="p-2">{new Date(created_at).toLocaleDateString()}</td>
                                <td>
                                   <StatusButtons groupStatus={status} groupId={id
                                   }/>
                                </td>
                            </tr>)
                        })}

                        </tbody>
                    </table>
                </div>
                <div/>
            </div>
        </div>
    )
}