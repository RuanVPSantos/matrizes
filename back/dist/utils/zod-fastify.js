"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodToFastify = zodToFastify;
const zod_1 = require("zod");
function zodToFastify(schema) {
    const shape = schema.shape;
    const result = {};
    if (shape.body) {
        result.body = zodToJsonSchema(shape.body);
    }
    if (shape.params) {
        result.params = zodToJsonSchema(shape.params);
    }
    if (shape.querystring) {
        result.querystring = zodToJsonSchema(shape.querystring);
    }
    if (shape.headers) {
        result.headers = zodToJsonSchema(shape.headers);
    }
    return result;
}
function zodToJsonSchema(zodSchema) {
    if (zodSchema instanceof zod_1.z.ZodObject) {
        const properties = {};
        const required = [];
        Object.entries(zodSchema.shape).forEach(([key, value]) => {
            properties[key] = zodToJsonSchema(value);
            if (!value.isOptional()) {
                required.push(key);
            }
        });
        return {
            type: "object",
            properties,
            required: required.length > 0 ? required : undefined
        };
    }
    if (zodSchema instanceof zod_1.z.ZodString) {
        return { type: "string" };
    }
    if (zodSchema instanceof zod_1.z.ZodNumber) {
        return { type: "number" };
    }
    if (zodSchema instanceof zod_1.z.ZodBoolean) {
        return { type: "boolean" };
    }
    if (zodSchema instanceof zod_1.z.ZodArray) {
        return {
            type: "array",
            items: zodToJsonSchema(zodSchema.element)
        };
    }
    if (zodSchema instanceof zod_1.z.ZodEnum) {
        return {
            type: "string",
            enum: zodSchema.options
        };
    }
    return {};
}
//# sourceMappingURL=zod-fastify.js.map