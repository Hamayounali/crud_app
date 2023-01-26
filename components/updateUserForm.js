// import { getUser } from "@/database/controller"
import { useReducer } from "react"
import { BiPlus} from "react-icons/bi"
import { useQuery, useMutation, useQueryClient } from "react-query"
import Success from "./success"
import { getUser, updateUser } from "@/lib/helper"

export default function UpdateUserForm({formId, formData, setFormData }){
    
    const queryClient = useQueryClient()
    const{ isLoading, isError, data, error } = useQuery(['users',formId],()=>getUser(formId))
    const UpdateMutation = useMutation((newData)=> updateUser(formId, newData),{
        onSuccess: async(data)=>{
            // console.log('Data updated')
            queryClient.setQueryData('users',(old)=>[data])
            // queryClient.prefetchQuery('users', getUser)
        }
    })

    if(isLoading) return <div> Loading...!</div> 
    if(isError) return <div> Error</div>

    const{ name, avatar, salary, date, email, status} = data;
    const[firstname, lastname] = name ? name.split(' '):formData

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`
        let updated = Object.assign({}, data, formData, {name: userName})
        console.log(updated)
        await UpdateMutation.mutate(updated)
    }

    return(
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="First Name" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={lastname} name="lasttname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Last Name" />
            </div>

            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={email} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>

            <div className="input-type">
                <input type="text" onChange={setFormData} defaultValue={salary} name="salary" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Salary" />
            </div>

            <div className="input-type">
                <input type="date" onChange={setFormData} defaultValue={date} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="date" />
            </div>

            <div className="flex gap-10 items-center">
                <div className="form-check">
                    <input value="Active" defaultChecked={status == "Active"} onChange={setFormData} id="radioDefault1" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-withe checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name ="status" />
                    <label htmlFor="radioDefault1" className="inline-block text-gray-800">
                        Active
                    </label>
                </div>

                <div className="form-check">
                    <input value="Inactive" defaultChecked={status !== "Active"} onChange={setFormData} id="radioDefault2" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-withe checked:bg-green-500 checked:border-gray-500 focus:outline-none duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name ="status" />
                    <label htmlFor="radioDefault2" className="inline-block text-gray-800">
                        Inactive
                    </label>
                </div>
            </div>

            <button className="felx justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                Update
            </button>
        </form>
    )
}