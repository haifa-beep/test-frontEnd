import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TechnicalAdminComponent } from "./technical-admin.component";
import { CourseAdminComponent } from "./components/companies-admin/course-admin.component";
import { CreateCourseComponent} from "./components/create-company/create-course.component"

const routes: Routes = [
  {
    path: "",
    component: TechnicalAdminComponent,
    children: [
      {
        path: "create-course",
        component:  CreateCourseComponent,
      },
      {
        path: "update-course/:id",
        component:  CreateCourseComponent,
      },
      {
        path: "courses",
        component: CourseAdminComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalAdminRoutingModule {}
