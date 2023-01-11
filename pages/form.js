import React, { useState } from 'react'
import { PlusCircleIcon } from "@heroicons/react/outline"
const Form = () => {
    const [formContent, setFormContent] = useState([{
        id: 0,
        name: "0",
        label: "Untitled Question",
        required: false,
        question_type: "short_answer",
        list: []
    }]);
    const [onEdit, setOnEdit] = useState(false);
    const [textField, setTextField] = useState("");
    const [editedField, setEditedField] = useState("");

    const addQuestion = () => {
        const field = {
            "name": `question_${formContent.length}`,
            "label": "Untitled question",
            required: false,
            "question_type": "short_answer", // "paragraph", "multichoice",
            "list": []
        }
        setFormContent([...formContent, field]);
    }

    const editField = (fieldName, fieldLabel) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex(f => f.name === fieldName);
        if (fieldIndex > -1) {
            formFields[fieldIndex].label = fieldLabel;
            setFormContent(formFields);
        }
    }

    const editFieldType = (fieldName, fieldLabel) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex(f => f.name === fieldName);
        if (fieldIndex > -1) {
            formFields[fieldIndex].question_type = fieldLabel;
            setFormContent(formFields);
        }
    }

    const addFieldOption = (fieldName, option) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex(f => f.name === fieldName);
        if (fieldIndex > -1) {
            if (option && option != "") {
                formFields[fieldIndex].list.push(option);
                setFormContent(formFields);
                setTextField("");
            }
        }
    }
    return (
        <div className='flex flex-col justify-start items-center px-4 h-screen w-4/5 space-y-4'>
            <div className='flex flex-col px-4 bg-white rounded-md justify-center item-start w-full shadow-sm border-indigo-800 border-t-8 space-y-2 h-24'>
                <h1 className='text-3xl font-semibold'>Form Header</h1>
                <p className='text-gray-500/80 capitalize'>Form Description</p>
            </div>

            <div className='relative flex flex-col w-full space-y-4'>
                {formContent.map((field) => {
                    return (
                        <div key={field.id} className="rounded-md bg-white flex w-full shadow-md px-4">
                            <div className='flex flex-col w-full'>
                                <div className='flex justify-between items-center space-y-2'>
                                    <div key={field.name} className="block text-sm font-medium text-gray-700 capitalize">
                                        {
                                            onEdit && (editedField === field.name) ?
                                                <input type="text" value={field.label} onChange={(e) => editField(field.name, e.target.value)} onBlur={() => { setOnEdit(false); setEditedField("") }} />
                                                :
                                                <label onClick={() => { setOnEdit(true); setEditedField(field.name) }}>{field.label}</label>
                                        }
                                    </div>
                                    <div>
                                        <select onChange={(e) => editFieldType(field.name, e.target.value)}>
                                            <option value="short_answer">Short Answer</option>
                                            <option value="paragraph">Paragraph</option>
                                            <option value="multichoice">Multichoice</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='my-4 w-full'>
                                    {
                                        field.question_type == 'short_answer' && <input type="text" className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} />
                                    }
                                    {
                                        field.question_type == 'paragraph' && <textarea rows={4} className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} />
                                    }
                                    {field.question_type == 'multichoice' &&
                                        <div className='my-4 flex flex-col space-y-2'>
                                            <select
                                                className='px-5 shadow-sm h-10 rounded-md block w-full'>
                                                {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                                            </select>
                                            <div className='flex space-between'>
                                                <input type="text" onChange={(e) => setTextField(e.target.value)} value={textField} placeholder="Add an option" className='flex-1' />
                                                <button className='bg-indigo-700 block hover:bg-indigo-900 text-white px-4' onClick={() => addFieldOption(field.name, textField)}>Add</button>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>


                        </div>
                    )
                })}
                <div className='absolute top-0 -right-16 flex flex-col items-center bg-white p-2 rounded-md shadow-md'>
                    <button onClick={() => addQuestion()}>
                        <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-indigo-500" />
                    </button>
                    <button onClick={() => addQuestion()}>
                        <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-indigo-500" />
                    </button>
                    <button onClick={() => addQuestion()}>
                        <PlusCircleIcon className="w-8 h-8 text-gray-400 hover:text-indigo-500" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Form