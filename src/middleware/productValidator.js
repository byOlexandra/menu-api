import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.object({
    ua: Joi.string().min(2).max(100).required(),
    en: Joi.string().min(2).max(100).required()
  }).required(),

  description: Joi.object({
    ua: Joi.string().min(10).max(500).required(),
    en: Joi.string().min(10).max(500).required()
  }).required(),

  price: Joi.number().positive().required(), 

  category: Joi.string()
    .valid('coffee', 'tea', 'seasonal', 'bakery', 'desserts')
    .required(), 

  volume: Joi.string().optional(),
  weight: Joi.string().optional(),
  isAvailable: Joi.boolean().default(true),
  
  options: Joi.object({
    milkAlternatives: Joi.boolean(),
    decaf: Joi.boolean()
  }).optional(),

  allergens: Joi.array()
    .items(Joi.string().valid('gluten', 'dairy', 'nuts', 'eggs'))
    .optional()
});

export const updateProductSchema = createProductSchema.fork(
  ['name', 'description', 'price', 'category'], 
  (fieldSchema) => fieldSchema.optional() 
);