import { Injectable } from '@angular/core';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class FetchScheduleService {

  private storageKey = 'selectedCourses';

  constructor() { }

  // Hämta kurser från localStorage
  getCourses(): Course[] {
    const courses = localStorage.getItem(this.storageKey);
    return courses ? JSON.parse(courses) : [];
  }

  // Rensa alla kurser från localStorage
  clearCourses(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Ta bort en specifik kurs från localStorage
  removeCourse(course: Course): Course[] {
    const courses = this.getCourses();
    const updatedCourses = courses.filter(c => c.courseCode !== course.courseCode);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedCourses));
    return updatedCourses;
  }
}
