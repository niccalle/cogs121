var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('login', {
    fb_id:            { type: 'int', primaryKey: true},
    email:     'string'
  }, callback);
};


exports.down = function(db, callback) {
  db.dropTable('login', callback);
};
