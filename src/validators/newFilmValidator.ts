import Joi  from '@hapi/joi';

/**
 * @description film form validator
 */
const validator = Joi.object().keys({
    name: Joi.string()
        .required()
        .regex(/^[A-Za-z]+$/)
        .messages({
            "string.pattern.base": "Alphabetic only",
            "any.required": "Name is required"
        }),
    releaseYear: Joi.number()
        .required()
        .min(1850)
        .max((new Date().getFullYear()))
        .messages({
            "number.max": `Number from 1850 to ${(new Date().getFullYear())}`,
            "number.min": `Number from 1850 to ${(new Date().getFullYear())}`,
            "any.required": "Year is required",
            "number.base": `Number from 1850 to ${(new Date().getFullYear())}`,
        }),
    format: Joi.string()
        .required(),
    actors: Joi.array()
        .required()
        .min(1)
        .items(Joi.string().regex(/^[A-Za-z ,]+$/))
        .messages({
            "string.pattern.base": "Alphabetic and comas only",
            "any.required": "Actors is required",
            "string.empty": "Required field"
        })
});

export default validator;
