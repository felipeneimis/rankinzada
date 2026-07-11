import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../../errors/AppError";
import { Prisma } from "../../../generated/prisma/client";

interface DriverAdapterError {
  cause?: {
    originalMessage?: string;
    constraint?: {
      index?: string;
    };
  };
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    const errors: Record<string, string> = {};
    for (const issue of err.issues) {
      const field = issue.path.join(".");
      errors[field] = issue.message;
    }
    return res.status(400).json({ errors });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const meta = err.meta as {
        driverAdapterError?: DriverAdapterError;
        modelName?: string;
      };
      const originalMessage = meta?.driverAdapterError?.cause?.originalMessage;

      const field = originalMessage
        ?.match(/"([^"]+)"$/)?.[1]
        ?.replace(`${meta?.modelName?.toLowerCase()}s_`, "")
        ?.replace("_key", "");

      return res.status(409).json({
        message: `${field ?? "Field"} is already in use`,
      });
    }

    if (err.code === "P2025") {
      const model = (err.meta?.modelName as string) ?? "Record";

      return res.status(404).json({
        message: `${model} not found`,
      });
    }

    if (err.code === "P2003") {
      const meta = err.meta as {
        driverAdapterError?: DriverAdapterError;
        modelName?: string;
      };
      const constraint = meta?.driverAdapterError?.cause?.constraint?.index;
      const field = constraint
        ?.match(/_(.+)_fkey$/)?.[1]
        ?.replace(`${meta?.modelName?.toLowerCase()}s_`, "");

      return res.status(409).json({
        message: field
          ? `Foreign key constraint violated on ${field}`
          : "Foreign key constraint violated",
      });
    }
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}
