import Dexie from "dexie";

let db = new Dexie("DB");

db.version(1).stores({
	users: '++id,fname,lname,phone,age'
});

db.open();

export default db;