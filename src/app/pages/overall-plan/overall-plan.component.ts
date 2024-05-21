import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchScheduleService } from '../../services/fetch-schedule.service'; 
import { Course } from '../../model/course'; 
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-overall-plan',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './overall-plan.component.html',
  styleUrls: ['./overall-plan.component.scss']
})
export class OverallPlanComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Course>([]);
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'remove'];
  totalPoints: number = 0;
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fetchScheduleService: FetchScheduleService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadCourses(): void {
    const courses = this.fetchScheduleService.getCourses();
    this.dataSource.data = courses;
    this.calculateTotalPoints();
  }

  removeCourse(course: Course): void {
    const updatedCourses = this.fetchScheduleService.removeCourse(course);
    this.dataSource.data = updatedCourses;
    this.calculateTotalPoints();
    this.snackBar.open(`Course ${course.courseCode} removed`, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  calculateTotalPoints(): void {
    this.totalPoints = this.dataSource.data.reduce((acc, course) => acc + course.points, 0);
  }
}
