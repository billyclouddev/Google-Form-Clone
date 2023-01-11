import React, { useState } from 'react'


const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};

const Submit = () => {
    const [formContent, setFormContent] = useState([{
        id: 0,
        name: "0",
        label: "what is your name ?",
        required: false,
        question_type: "short_answer",
        list: []
    },
    {
        id: 1,
        name: "1",
        label: "Describe yourself ?",
        required: false,
        question_type: "paragraph",
        list: []
    },
    {
        id: 2,
        name: "2",
        label: "what is your favorite color ?",
        required: false,
        question_type: "multichoice",
        list: ["Red", "Green", "Blue"]
    }
    ]);

    const submitForm = (e) => {
        e.preventDefault();

        //loop through our questions & get values based on the element name
        const formTargets = e.target;
        let data = [];
        formContent.map(content => {
            const element = camelize(content.label)
            data.push({
                question: content.label,
                answer : formTargets[element].value
            })
        })

        console.log("form data", data)
    }
    return (
        <form onSubmit={submitForm} className='flex flex-col justify-start items-center px-4 h-screen w-4/5 space-y-4'>
            <div className='flex flex-col px-4 bg-white rounded-md justify-center item-start w-full shadow-sm border-indigo-800 border-t-8 space-y-2 h-24'>
                <h1 className='text-3xl font-semibold'>Form Header</h1>
                <p className='text-gray-500/80 capitalize'>Form Description</p>
            </div>
            {
                formContent.map((field) => {
                    return (
                        <div key={field.id} className="rounded-md bg-white flex flex-col px-4 w-full shadow-md">
                            <div className='flex justify-between items-center space-y-2'>
                                <div key={field.name} className="block text-sm font-medium text-gray-700 capitalize">
                                    <label onClick={() => setOnEdit(true)}>{field.label}</label>
                                </div>

                            </div>

                            <div className='my-4'>
                                {
                                    field.question_type == 'short_answer' && <input type="text" className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} name={camelize(field.label)} />
                                }
                                {
                                    field.question_type == 'paragraph' && <textarea rows={4} className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} name={camelize(field.label)} />
                                }
                                {
                                    field.question_type == 'multichoice' &&
                                    <select
                                        name={camelize(field.label)}
                                        className='px-5 shadow-sm h-10 rounded-md block w-full'>
                                        {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </select>
                                }
                            </div>

                        </div>
                    )
                })
            }

            <div className='flex justify-between w-full'>
                <button type='submit' className='bg-indigo-500 p-4 text-white rounded-md w-32 text-sm'>Submit</button>
            </div>
        </form>
    )
}

export default Submit