import {
  ClassroomWithLessons, LessonType, ScheduleFilter, Weekday, ClassroomSchedule,
} from './models';

export const getClassroomsSchedule = (data: ClassroomWithLessons[], filter: Partial<ScheduleFilter>): ClassroomSchedule[] => {
  const combinedFilter: ScheduleFilter = {
    weekday: filter.weekday || Weekday.Monday,
    excludedLessonTypes: filter.excludedLessonTypes || [],
    isEven: Boolean(filter.isEven),
  };

  return data
    .map((classroom) => ({
      ...classroom,
      lessons: classroom.lessons
        .filter((lesson) => (
          combinedFilter.isEven === Boolean(lesson.isEven)
          && combinedFilter.weekday === lesson.weekday
        )),
    }))
    .filter((classroom) => classroom.lessons
      .every((lesson) => !combinedFilter.excludedLessonTypes.includes(lesson.type)))
    .map((classroom) => ({
      room: classroom.room,
      roomId: classroom.id,
      isLesson1: classroom.lessons.some((lesson) => lesson.type === LessonType.Lesson1),
      isLesson2: classroom.lessons.some((lesson) => lesson.type === LessonType.Lesson2),
      isLesson3: classroom.lessons.some((lesson) => lesson.type === LessonType.Lesson3),
      isLesson4: classroom.lessons.some((lesson) => lesson.type === LessonType.Lesson4),
      isLesson5: classroom.lessons.some((lesson) => lesson.type === LessonType.Lesson5),
      isLesson6: classroom.lessons.some((lesson) => lesson.type === LessonType.Lesson6),
    }));
};
