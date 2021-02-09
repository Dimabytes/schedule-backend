import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { Classroom, Lesson } from '../models';

let pool: Database;

const initDb = async () => {
  pool = await open({
    filename: './db.db',
    driver: sqlite3.Database,
  });
};

const getAllClassrooms = async () => pool.all<Classroom[]>('SELECT * FROM classroom');

const getAllLessons = async () => pool.all<Lesson[]>('SELECT * FROM lesson');

export const db = {
  initDb,
  getAllClassrooms,
  getAllLessons,
};
