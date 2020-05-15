import React, { useState } from 'react';


export interface IUseForm {
    fields?: Array<string>;
    initState?: Map<string, string>
}
/**
 * @description Fills text forms from forms which have 'name' parameter only
 * @return {[Map<string, string>, (event: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => void]}
 * formData - Map with filled data, fillForm - function that fills form, pass it to onChange
 */
const useForm = (init?: IUseForm): [Map<string, string>, (event: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => void, () => void] => {
    let initState = new Map<string, string>();

    if (init && init.initState) {
        initState = init.initState;
    }

    if (init && init.fields) {
        for (const field of init.fields) {
            initState.set(field, '');
        }
    }

    const [formData, setFormData] = useState<Map<string, string>>(initState);

    const fillForm = (event: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => {
        fieldName = fieldName || event.target.name;

        const newFormData = new Map(formData.set(fieldName, event.target.value));

        setFormData(newFormData);
    };

    const resetForm = () => {
        setFormData((prevState: Map<string, string>): Map<string, string> => {
            const keys = prevState.keys();
            for (const key of keys) {
                prevState.set(key, '');
            }

            return new Map(prevState);
        });
    }

    return [formData, fillForm, resetForm];
};


export default useForm;
