import DB from '../db/index.js';

export default async function routes(fastify, options) {
  /* ---------------- Schemas ---------------- */
  const EmailSchema = {
    type: 'object',
    required: ['to', 'subject'],
    properties: {
      to: { type: 'string' },
      cc: { type: 'string' },
      bcc: { type: 'string' },
      subject: { type: 'string' },
      body: { type: 'string' }
    }
  };

  /* ---------------- Routes ---------------- */
  fastify.get('/api/emails', {
    schema: {
      querystring: {
        page: { type: 'integer', minimum: 1, default: 1 },
        limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
      }
    }
  }, async (request, reply) => {
    const { page, limit } = request.query;
    const emails = await DB.getAllEmails({ page, limit });
    return { data: emails };
  });

  fastify.get('/api/emails/search', {
    schema: {
      querystring: {
        q: { type: 'string' },
        page: { type: 'integer', minimum: 1, default: 1 },
        limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }
      }
    }
  }, async (request, reply) => {
    const { q, page, limit } = request.query;
    const results = await DB.searchEmails(q, { page, limit });
    return { data: results };
  });

  fastify.get('/api/emails/:id', {
    schema: {
      params: { id: { type: 'integer' } }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const email = await DB.getEmailById(id);
    if (!email) {
      return reply.code(404).send({ error: 'Email not found' });
    }
    return { data: email };
  });

  fastify.post('/api/emails', {
    schema: {
      body: EmailSchema
    }
  }, async (request, reply) => {
    try {
      const created = await DB.createEmail(request.body);
      return reply.code(201).send({ data: created });
    } catch (err) {
      return reply.code(400).send({ error: err.message });
    }
  });
}
