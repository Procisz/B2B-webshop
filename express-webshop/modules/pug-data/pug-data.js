const BetagDB = require('./../webshop-mariadb');

const betagDB = new BetagDB();

module.exports = class PugData {

  constructor() {
    this.pathName = '';
  }

  async readRecordBySEO(req) {
    this.pathName = req.originalUrl;
    const urlParts = this.pathName.split('/');
    const seoName = urlParts[urlParts.length - 1];
    const tableName = urlParts[urlParts.length - 2];
    return await betagDB.readRecord(tableName, {
      seo: `${seoName}`,
    });
  }

  async readAllRecordsByURL(req) {
    this.pathName = req.originalUrl;
    const urlParts = this.pathName.split('/');
    const tableName = urlParts[urlParts.length - 1];
    return await betagDB.readRecord(tableName, {});
  }

  async readSpecificTable(tableName, queryObject = {}) {
    return await betagDB.readRecord(tableName, queryObject);
  }

  async createRecord(tableName, data) {
    return await betagDB.createRecord(tableName, data)
  }

  async updateSpecificTable(tableName, queryObject, data) {
    return await betagDB.updateRecord(tableName, queryObject, data);
  }

  async deleteSpecificRecord(tableName, queryObject) {
    return await betagDB.deleteRecord(tableName, queryObject);
  }

};
