import path from 'path';
import fs from 'fs';
import { getClassroomsSchedule } from '../filterSchedule';
import { getClassroomsWithLessons } from '../getClassroomsWithLessons';
import { LessonType, Weekday } from '../models';

const getFixturePath = (filename: string) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename: string) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const classrooms = JSON.parse(readFile('classrooms.json'));
const lessons = JSON.parse(readFile('lessons.json'));
const classroomsWithLessons = JSON.parse(readFile('classroomsWithLessons.json'));

const expectedEmptyFilter = JSON.parse(readFile('expectedEmptyFilter.json'));
const expectedEvenMondayLesson1 = JSON.parse(readFile('expectedEvenMondayLesson1.json'));

test('getClassroomsWithLessons', () => {
  const res = getClassroomsWithLessons(classrooms, lessons);
  expect(res).toEqual(classroomsWithLessons);
});

describe('filter schedule', () => {
  test('empty filter', () => {
    const data = getClassroomsSchedule(classroomsWithLessons, {});
    expect(data).toEqual(expectedEmptyFilter);
  });

  test('even monday Lesson1', () => {
    const filter = {
      weekdays: Weekday.Monday,
      excludedLessonTypes: [LessonType.Lesson1],
      isEven: true,
    };
    const data = getClassroomsSchedule(classroomsWithLessons, filter);
    expect(data).toEqual(expectedEvenMondayLesson1);
  });

  test('odd Saturday Lesson2', () => {
    const filter = {
      weekday: Weekday.Saturday,
      excludedLessonTypes: [LessonType.Lesson2],
      isEven: false,
    };
    const data = getClassroomsSchedule(classroomsWithLessons, filter);
    expect(data).toEqual([]);
  });
});
