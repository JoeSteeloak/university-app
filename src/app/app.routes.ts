import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { OverallPlanComponent } from './pages/overall-plan/overall-plan.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "courses", component: CoursesComponent },
    { path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "overall-plan", component: OverallPlanComponent}
];
