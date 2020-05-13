import { useState } from 'react';
import Joi from '@hapi/joi';


/**
 * @description hook to validate form data
 * @param validator {Joi.ObjectSchema} - receives Joi validator
 * @return validate (data: any, action: any)
 */
const useValidator = (validator: Joi.ObjectSchema): [Map<string, string>, (data: any, action?: any) => void] => {
    const [errors, setErrors] = useState(new Map<string, string>());


    /**
     * @description validator to validate form data
     * @param data - object with same schema as in validator
     * @param action - action to perform if successful validation
     */
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
