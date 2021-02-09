import {
  ClassroomSchedule, ClassroomWithLessons, LessonType, ScheduleFilter, Weekday,
} from './models';

const isLessonInClassroom = (classroom: ClassroomWithLessons, lesson: LessonType) => classroom
  .lessons.some((classroomLesson) => classroomLesson.type === lesson);

const convertToSchedule = (classroom: ClassroomWithLessons) => ({
  room: classroom.room,
  roomId: classroom.id,
  isLesson1: isLessonInClassroom(classroom, LessonType.Lesson1),
  isLesson2: isLessonInClassroom(classroom, LessonType.Lesson2),
  isLesson3: isLessonInClassroom(classroom, LessonType.Lesson3),
  isLesson4: isLessonInClassroom(classroom, LessonType.Lesson4),
  isLesson5: isLessonInClassroom(classroom, LessonType.Lesson5),
  isLesson6: isLessonInClassroom(classroom, LessonType.Lesson6),
});

export const getClassroomsSchedule = (
  data: ClassroomWithLessons[],
  filter: Partial<ScheduleFilter>,
): ClassroomSchedule[] => {
  const combinedFilter: ScheduleFilter = {
    weekday: filter.weekday || Weekday.Monday,
    excludedLessonTypes: filter.excludedLessonTypes || [],
    isEven: Boolean(filter.isEven),
  };

  const classroomWithFilteredLessons = data
    .map((classroom) => ({
      ...classroom,
      lessons: classroom.lessons
        .filter((lesson) => (
          combinedFilter.isEven === Boolean(lesson.isEven)
                && combinedFilter.weekday === lesson.weekday
        )),
    }));

  const filteredClassrooms = classroomWithFilteredLessons.filter((classroom) => classroom.lessons
    .every((lesson) => !combinedFilter.excludedLessonTypes.includes(lesson.type)));

  return filteredClassrooms.map(convertToSchedule);
};
