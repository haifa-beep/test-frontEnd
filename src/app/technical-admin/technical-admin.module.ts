import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseAdminComponent } from "./components/companies-admin/course-admin.component";
import { TechnicalAdminRoutingModule } from './technical-admin-routing.module';
import { TechnicalAdminComponent } from './technical-admin.component';
import { CreateCourseComponent } from './components/create-company/create-course.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    TechnicalAdminComponent,
    CourseAdminComponent,
    CreateCourseComponent,
  ],
  imports: [CommonModule, TechnicalAdminRoutingModule, SharedModule],
})
export class TechnicalAdminModule {}
