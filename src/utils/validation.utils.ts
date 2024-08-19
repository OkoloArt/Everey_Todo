import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((error) => ({
          property: error.property,
          constraints: error.constraints,
        })),
      });
    }

    next();
  };
}
