import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule,
): boolean => {
  const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
  const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);

    // 10:30 - 12:30
    // 11:30 - 1.30
    const isConflict =
      newStartTime < existingEndTime && newEndTime > existingStartTime;

    // console.log('Conflict Detected:', isConflict);

    if (isConflict) {
      return true;
    }
  }

  // console.log(' No conflict found.');
  return false;
};
