import knex from 'knex';
import knexConfig from '../../knexfile.js';

// Ensure we use the same configuration as migrations (development env)
const db = knex(knexConfig.development);

// Verify connection at startup (SQLite will open or create the file, but wrap in try-catch for consistency)
try {
  await db.raw('select 1 + 1 as result');
} catch (err) {
  /* eslint-disable no-console */
  console.error('Database connection failed:', err);
  throw err;
}

class DB {
  static get connection() {
    return db;
  }

  /* ---------------- EMAIL CRUD ---------------- */
  static async createEmail({ to, cc, bcc, subject, body }) {
    if (!to || !subject) {
      throw new Error('`to` and `subject` are required fields');
    }
    const [id] = await db('emails').insert({ to, cc, bcc, subject, body });
    return this.getEmailById(id);
  }

  static async getAllEmails({ page = 1, limit = 20 } = {}) {
    const offset = (page - 1) * limit;
    return db('emails')
      .select('*')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  static async getEmailById(id) {
    return db('emails').where({ id }).first();
  }

  static async searchEmails(query, { page = 1, limit = 20 } = {}) {
    if (!query) return this.getAllEmails({ page, limit });

    const offset = (page - 1) * limit;
    return db('emails')
      .where(builder => {
        builder
          .whereLike('to', `%${query}%`)
          .orWhereLike('cc', `%${query}%`)
          .orWhereLike('bcc', `%${query}%`)
          .orWhereLike('subject', `%${query}%`)
          .orWhereLike('body', `%${query}%`);
      })
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }
}

export default DB;
