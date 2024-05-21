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
import { MatSelectModule } from '@angular/material/select';  
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', "add"];
  dataSource: MatTableDataSource<CourseData> = new MatTableDataSource<CourseData>();
  originalCourseData: CourseData[] = []; // För att spara originalkursdatan
  subjects: string[] = []; // för att spara unika objekt
  selectedSubject: string = ''; // spara för filtrering

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fetchCoursesService: FetchCoursesService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.fetchCoursesService.getCourses().subscribe((data: Course[]) => {
      const courseData: CourseData[] = data.map(course => ({
        courseCode: course.courseCode,
        courseName: course.courseName,
        points: course.points,
        subject: course.subject,
        syllabus: course.syllabus
      }));
      this.originalCourseData = courseData; // Spara originalkursdatan
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
      this.dataSource.data = this.originalCourseData; // återställ till originalkursdata
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addToLocalStorage(course: CourseData) {
    // Hämta nuvarande array från localStorage
    const currentData = JSON.parse(localStorage.getItem('selectedCourses') || '[]');
  
    // Kontrollera om kursen redan finns
    const courseExists = currentData.some((storedCourse: CourseData) => storedCourse.courseCode === course.courseCode);
  
    if (courseExists) {
      // Om kursen redan finns, visa en snackbar med ett felmeddelande
      this.snackBar.open('Kursen är redan tillagd!', 'Stäng', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    } else {
      // Om kursen inte finns, lägg till den till arrayen och spara i localStorage
      currentData.push(course);
      localStorage.setItem('selectedCourses', JSON.stringify(currentData));
  
      // Visa en snackbar med ett framgångsmeddelande
      this.snackBar.open('Kursen sparades till ditt ramschema!', 'Stäng', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }
}
