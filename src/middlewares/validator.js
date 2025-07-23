import Joi from "joi";

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Example usage
const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
});
const productSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    price: Joi.number().positive().required(),
    img: Joi.string().uri().required(),
    categories: Joi.array().items(Joi.string()).optional(),
    size: Joi.string().optional(),
    color: Joi.string().optional(),
});

export const cartSchema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().integer().min(1).default(1),
        })
    ).required(),
});
const orderSchema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().integer().min(1).default(1),
        })
    ).required(),
    amount: Joi.number().positive().required(),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        zip: Joi.string().required(),
        country: Joi.string().required()
    }).required(),
    status: Joi.string().valid("pending", "shipped", "delivered").default("pending")
});


export const validateLogin = validateSchema(loginSchema);
export const validateUser = validateSchema(userSchema);
export const validateProduct = validateSchema(productSchema);
export const validateCart = validateSchema(cartSchema);
export const validateOrder = validateSchema(orderSchema);
// Example usage for order validation


