import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import pickupRoutes from "./src/pickup/pickup.routes.ts";

const server = Fastify({
  logger: true,
});

server.register(pickupRoutes, {prefix: '/api'});

server.get('/', (_request: FastifyRequest, _reply: FastifyReply) => "server up!")

server.listen({ port: 8080 }, (err, address) => {
  if(err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`);
});
