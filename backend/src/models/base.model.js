const { Pool } = require("pg");
const config = require("../config/pgsqlConfig");

const pool = new Pool(config);

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async save() {
        try {
            const data = { ...this };
            delete data.tableName;

            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');

            const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            const result = await pool.query(query, values);
            
            return result.rows[0];
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async find(filters = {}) {
        try {
            let query = `SELECT * FROM ${this.tableName}`;
            const values = [];
            
            if (Object.keys(filters).length > 0) {
                const conditions = Object.keys(filters)
                    .map((key, index) => {
                        values.push(filters[key]);
                        return `${key} = $${index + 1}`;
                    })
                    .join(' AND ');
                query += ` WHERE ${conditions}`;
            }

            const result = await pool.query(query, values);
            return result.rows;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async findById(id) {
        try {
            const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
            const result = await pool.query(query, [id]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async deleteById(id) {
        try {
            const fetchQuery = `SELECT * FROM ${this.tableName} WHERE id = $1`;
            const fetchResult = await pool.query(fetchQuery, [id]);

            if (fetchResult.rows.length === 0) {
                throw new Error("Record not found.");
            }

            const deleteQuery = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`;
            const deleteResult = await pool.query(deleteQuery, [id]);

            return deleteResult.rows[0]; // Return deleted row
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateById(id, updateData) {
        try {
            const keys = Object.keys(updateData);
            const values = Object.values(updateData);
            const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

            const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
            values.push(id);

            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                throw new Error("Update failed, no rows affected.");
            }

            return result.rows[0]; // Return updated row
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = BaseModel;
