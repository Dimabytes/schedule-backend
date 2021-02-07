import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './utils';
import { getClassroomsWithLessons } from './getClassroomsWithLessons';
import { getClassroomsSchedule } from './filterSchedule';
import {
  LessonType, Weekday, ClassroomWithLessons, ScheduleFilter,
} from './models';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

let allData: ClassroomWithLessons[] = [];

app.post('/schedule', async (req, res) => {
  const filter: ScheduleFilter = {
    weekday: req.body.weekday as Weekday,
    excludedLessonTypes: req.body.excludedLessonTypes as LessonType[],
    isEven: Boolean(req.query.isEven),
  };
  console.log(filter);
  const filteredData = getClassroomsSchedule(allData, filter);
  res.status(200).json(filteredData);
});

const main = async () => {
  await db.initDb();
  const classrooms = await db.getAllClassrooms();
  const lessons = await db.getAllLessons();
  allData = getClassroomsWithLessons(classrooms, lessons);

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
};

main();
