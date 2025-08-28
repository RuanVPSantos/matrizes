import { z } from "zod";

export function zodToFastify(schema: z.ZodObject<any>) {
  const shape = schema.shape;
  const result: any = {};

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

function zodToJsonSchema(zodSchema: z.ZodTypeAny): any {
  if (zodSchema instanceof z.ZodObject) {
    const properties: any = {};
    const required: string[] = [];

    Object.entries(zodSchema.shape).forEach(([key, value]) => {
      properties[key] = zodToJsonSchema(value as z.ZodTypeAny);
      if (!(value as z.ZodTypeAny).isOptional()) {
        required.push(key);
      }
    });

    return {
      type: "object",
      properties,
      required: required.length > 0 ? required : undefined
    };
  }

  if (zodSchema instanceof z.ZodString) {
    return { type: "string" };
  }

  if (zodSchema instanceof z.ZodNumber) {
    return { type: "number" };
  }

  if (zodSchema instanceof z.ZodBoolean) {
    return { type: "boolean" };
  }

  if (zodSchema instanceof z.ZodArray) {
    return {
      type: "array",
      items: zodToJsonSchema(zodSchema.element)
    };
  }

  if (zodSchema instanceof z.ZodEnum) {
    return {
      type: "string",
      enum: zodSchema.options
    };
  }

  return {};
}
