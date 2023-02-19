import { Component, OnInit, Input } from "@angular/core"

@Component({
    selector: "app-overview",
    templateUrl: "./my-urls-overview.component.html",
    styleUrls: ["./my-urls-overview.component.css"]
})
export class MyUrlsOverviewComponent implements OnInit {
    @Input() total_urls_clicks = 0
    @Input() total_urls?: number
    constructor() {}

    ngOnInit(): void {}
}
