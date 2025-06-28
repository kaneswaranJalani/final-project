import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  primaryPhone: Joi.string().required(),
  secondaryPhone: Joi.string().allow('').optional(),
  address: Joi.string().required(),
  idProof: Joi.string().required(),
  rentalPreferences: Joi.array().items(Joi.string()).default([])
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});