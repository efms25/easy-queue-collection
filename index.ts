import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.listen({ port: 8080 }, (err, address) => {
  if(err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`);
});
