import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class FetchScheduleService {

  private storageKey = 'selectedCourses';

  constructor() { }

  getCourses(): Course[] {
    const courses = localStorage.getItem(this.storageKey);
    return courses ? JSON.parse(courses) : [];
  }

  clearCourses(): void {
    localStorage.removeItem(this.storageKey);
  }

  removeCourse(course: Course): Course[] {
    let courses = this.getCourses();
    courses = courses.filter(c => c.courseCode !== course.courseCode);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
    return courses;
  }
}
