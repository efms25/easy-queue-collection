import Fastify from "fastify";
import pickupRoutes from "./src/pickup/pickup.routes";

const server = Fastify({
  logger: true,
});

server.register(pickupRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if(err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`);
});
