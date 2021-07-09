// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { FormDataService } from "../formData.service";
// import { Fighter } from "./fighter.model";

// @Injectable({ providedIn: 'root' })

// export class BackendService {
//     constructor(private backend: HttpClient, private formDataService: FormDataService) { }

//     saveFighters() {
//         const fighters = this.formDataService.allFighters;
//         this.backend.put('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json', fighters).subscribe(
//             (res: Fighter[]) => {
//                 console.log(res);
//             }
//         );
//     }

//     loadFighters() {
//         this.backend.get('https://ng-project-fighter-default-rtdb.firebaseio.com/fighters.json').subscribe(
//             (res: Fighter[]) => {
//                 console.log(res);
//                 this.formDataService.updateFighters(res);
//             }
//         )
//     }
// }