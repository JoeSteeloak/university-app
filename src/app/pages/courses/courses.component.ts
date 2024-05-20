import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetchCoursesService } from '../../services/fetch-courses.service';
import { Course } from '../../model/course';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';  // Import MatSelectModule

export interface CourseData {
  courseCode: string;
  courseName: string;
  points: number;
  subject: string;
  syllabus: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule  // Include MatSelectModule in imports
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus'];
  dataSource: MatTableDataSource<CourseData> = new MatTableDataSource<CourseData>();
  originalCourseData: CourseData[] = []; // To store original course data
  subjects: string[] = []; // To store unique subjects
  selectedSubject: string = ''; // To store the selected subject for filtering

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fetchCoursesService: FetchCoursesService) {}

  ngOnInit() {
    this.fetchCoursesService.getCourses().subscribe((data: Course[]) => {
      const courseData: CourseData[] = data.map(course => ({
        courseCode: course.courseCode,
        courseName: course.courseName,
        points: course.points,
        subject: course.subject,
        syllabus: course.syllabus
      }));
      this.originalCourseData = courseData; // Save the original course data
      this.dataSource.data = courseData;
      this.subjects = Array.from(new Set(courseData.map(course => course.subject))); // Get unique subjects
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applySubjectFilter() {
    if (this.selectedSubject) {
      const filteredData = this.originalCourseData.filter(course => course.subject.toLowerCase() === this.selectedSubject.toLowerCase());
      this.dataSource.data = filteredData;
    } else {
      this.dataSource.data = this.originalCourseData; // Reset to original data if no subject is selected
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
