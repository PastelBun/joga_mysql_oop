const conn = require('../utils/db');

class BaseSQLModel {
    
    constructor(tableName){
        this.tableName = tableName;
    } 

    // Method to execute a single or multiple queries
    executeQuery(query, params) {
        return new Promise((resolve, reject) => {
            // Handle multiple queries separated by semicolons
            conn.query(query, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results); // Array of results for each query
                }
            });
        });
    }


    async findAll() {
        const query = `SELECT * FROM ${this.tableName}`;
        const results = await this.executeQuery(query);
        return results;
    }

    async findById(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        const results = await this.executeQuery(query, [id]);
        return results[0];
    }

    async findOne(where, value) {
        const query = `SELECT * FROM ${this.tableName} WHERE ${where}="${value}"`;
        const results = await this.executeQuery(query, [where, value]);
        return results[0];
    }

    async findMany(where, value){
      const query=`SELECT * FROM ${this.tableName} WHERE ${where}="${value}"`
      const results=await this.executeQuery(query,[where, value])
      return results;
    }

    async create(data) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    const result = await this.executeQuery(query, data);
    return result.insertId;
    }

    async update(data, id) {
    const query = `UPDATE ${this.tableName} SET ${data} WHERE id = ${id}`;
    const result = await this.executeQuery(query, [data, id]);
    return result.affectedRows;
    }

    async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.executeQuery(query, [id]);
    return result.affectedRows;
    }
} 

module.exports = BaseSQLModel;