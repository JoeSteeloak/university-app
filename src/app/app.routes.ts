import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { OverallPlanComponent } from './pages/overall-plan/overall-plan.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent, title: 'Pildammarnas Universitet' },
    { path: "courses", component: CoursesComponent, title: 'Kurser - Pildammarnas Universitet' },
    { path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "overall-plan", component: OverallPlanComponent, title: 'Ramschema - Pildammarnas Universitet'}
];
