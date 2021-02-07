import { Classroom, Lesson } from './models';

export const getClassroomsWithLessons = (
  classrooms: Classroom[], lessons: Lesson[],
) => classrooms
  .map((classroom) => ({
    ...classroom,
    lessons: lessons.filter((lesson) => lesson.classroom === classroom.id),
  }));
