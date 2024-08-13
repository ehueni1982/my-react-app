import { EsperoDB } from 'esperodb';

//database structure
const dataStructure: any = [
  {
    'videos': [
      { 
            indexes: [{ 'category': { unique: true } }], primaryKey: "_id" }
    ],
  }
 
];

const dbVersion: number = 3;

// Create an instance of the local database
export const db = new EsperoDB('mavideotube', dataStructure, dbVersion);
