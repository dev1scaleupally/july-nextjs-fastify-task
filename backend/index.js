// ESM
import Fastify from 'fastify';
import routes from './src/routes/index.js';
import dotenv from 'dotenv';
import cors from '@fastify/cors';

// Load environment variables from .env file
dotenv.config();

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
});

fastify.register(routes);
fastify.register(cors, { origin: true });

fastify.listen({ port: process.env.PORT || 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
