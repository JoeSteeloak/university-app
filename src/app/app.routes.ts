import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { OverallPlanComponent } from './pages/overall-plan/overall-plan.component';

export const routes: Routes = [
    { path: "courses", component: CoursesComponent },
    { path: "", redirectTo: "/courses", pathMatch: "full"},
    { path: "overall-plan", component: OverallPlanComponent}
];
