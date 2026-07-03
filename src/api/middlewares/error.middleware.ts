import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../../errors/AppError";

// src/middlewares/errorHandler.ts
export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ZodError) {
        const errors: Record<string, string> = {};
        for (const issue of err.issues) {
            const field = issue.path.join(".");
            errors[field] = issue.message;
        }
        return res.status(400).json({ errors });
    }

    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const cause = (err.meta?.driverAdapterError as any)?.cause;
            const originalMessage = cause?.originalMessage as string;

            // ex: 'duplicar valor da chave viola a restrição de unicidade "users_username_key"'
            // extrai o nome do campo entre aspas
            const field = originalMessage?.match(/"([^"]+)"$/)?.[1]
                ?.replace(`${(err.meta?.modelName as string).toLowerCase()}s_`, "") // remove "users_"
                ?.replace("_key", ""); // remove "_key"

            return res.status(409).json({
                message: `${field ?? "Campo"} já está em uso`,
            });
        }

        if (err.code === "P2025") {
            const model = err.meta?.modelName as string ?? "Registro";

            return res.status(404).json({
                message: `${model} não encontrado`,
            });
        }
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
}