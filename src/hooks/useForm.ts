import React, { useState } from 'react';

/**
 * @description Fills text forms from forms which have 'name' parameter only
 * @return {[Map<string, string>, (event: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => void]}
 * formData - Map with filled data, fillForm - function that fills form, pass it to onChange
 */
const useForm = (): [Map<string, string>, (event: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => void] => {
    const [formData, setFormData] = useState<Map<string, string>>(new Map());

    const fillForm = (event: React.ChangeEvent<HTMLInputElement>, fieldName?: string) => {
        fieldName = fieldName || event.target.name;

        const newFormData = new Map(formData.set(fieldName, event.target.value));

        setFormData(newFormData);
    };

    return [formData, fillForm];
};


export default useForm;
