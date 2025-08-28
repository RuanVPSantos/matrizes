import { FastifyRequest, FastifyReply } from "fastify";
import * as authService from "../../services/auth.service";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, password } = request.body as any;
    const user = await authService.registerUser({ name, email, password });
    reply.status(201).send(user);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email, password } = request.body as any;
    const result = await authService.loginUser({ email, password });
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function renewTokenController(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (!request.user?.id) {
      return reply.status(401).send({ message: 'User not authenticated' });
    }
    const token = await authService.renewToken(request.user.id);
    reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
