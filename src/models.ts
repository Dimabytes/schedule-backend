/* eslint-disable no-shadow, no-unused-vars */
export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export enum LessonType {
  Lesson1 = 'Lesson1',
  Lesson2 = 'Lesson2',
  Lesson3 = 'Lesson3',
  Lesson4 = 'Lesson4',
  Lesson5 = 'Lesson5',
  Lesson6 = 'Lesson6',
}

export interface Classroom {
  room: string;
  id: string;
}

export interface Lesson {
  id: string;
  isEven: number;
  classroom: string;
  weekday: Weekday;
  type: LessonType;
}

export interface ClassroomWithLessons extends Classroom{
  lessons: Lesson[]
}

export interface ScheduleFilter {
  weekday: Weekday;
  excludedLessonTypes: LessonType[];
  isEven: boolean;
}

export interface ClassroomSchedule {
  room: string;
  roomId: string;
  isLesson1: boolean;
  isLesson2: boolean;
  isLesson3: boolean;
  isLesson4: boolean;
  isLesson5: boolean;
  isLesson6: boolean;
}
