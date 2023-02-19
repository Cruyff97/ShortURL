import { InputComponent } from "./../input/input.component"
import { ReactiveFormsModule } from "@angular/forms"
import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { ClipboardModule } from "@angular/cdk/clipboard"
import { MatIconModule } from "@angular/material/icon"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatDialogModule } from "@angular/material/dialog"
import { MatRippleModule } from "@angular/material/core"
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatRippleModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ClipboardModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule,
        MatRippleModule
    ]
})
export class MaterialModule {}
