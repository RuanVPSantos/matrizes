import { FastifyRequest, FastifyReply } from "fastify";
import * as userService from "../../services/user.service";

export async function getAllUsersController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await userService.getAllUsers();
    reply.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function getUserByIdController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const user = await userService.getUserById(Number(id));
    reply.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function updateUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const updateData = request.body as any;
    const user = await userService.updateUser(Number(id), updateData);
    reply.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function deleteUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const result = await userService.deleteUser(Number(id));
    reply.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function blockUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const user = await userService.blockUser(Number(id));
    reply.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export async function unblockUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const user = await userService.unblockUser(Number(id));
    reply.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}
