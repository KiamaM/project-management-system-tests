import Joi from "joi";

export const loginUserValidation=Joi.object({
  email: Joi.string().required().email({
      minDomainSegments:2, tlds:{
          allow: ['com', 'ke']
      }
  }),
  password: Joi.string().required()
})
