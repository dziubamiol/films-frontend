import { useState } from 'react';
import Joi from '@hapi/joi';



const useValidator = (validator: Joi.ObjectSchema): [Map<string, string>, (data: any, action?: any) => void] => {
    const [errors, setErrors] = useState(new Map<string, string>());

    const validate = (data: any, action: any)  => {

        const validationResult = validator.validate(data, {abortEarly: false});

        if (validationResult.error) {
            const newErrors = new Map<string, string>([]);
            for (const error of validationResult.error.details) {
                error.path[0] && newErrors.set(error.path[0].toString(), error.message);
            }
            setErrors(newErrors);
        } else {
            setErrors(new Map<string, string>([]));
            action && action();
        }
    }

    return [errors, validate];
}

export default useValidator;
