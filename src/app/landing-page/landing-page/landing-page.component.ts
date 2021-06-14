// FOR FUTURE UPDATES

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { State, Store } from '@ngrx/store';
// import { GetFighters } from 'src/app/all-fighters/store/fighters.actions';
// import { Fighter } from 'src/app/shared/models/fighter.model';
// import * as mainStore from '../../store/app.reducer';

// @Component({
//   selector: 'app-landing-page',
//   templateUrl: './landing-page.component.html',
//   styleUrls: ['./landing-page.component.scss']
// })
// export class LandingPageComponent implements OnInit {



//   constructor(
//     private store: Store<mainStore.AppState>,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     // this.store.dispatch(new GetFighters());
//     console.log('landing');
//   }

//   dummyHOFArr: Fighter[] = [
//     new Fighter(
//       {
//         imageURL: 'https://www.sherdog.com/image_crop/200/300/_images/fighter/1599948362978.png',
//         name: 'Giga',
//         nickname: 'Ninja',
//         surname: 'Chikadze'
//       },
//       {
//         age: 32,
//         height: 182.88,
//         reach: 187.96,
//         weight: 65,
//       },
//       'Giga is perhaps one of the best strikers to ever grace the octagon. His background in Karate and Kickboxing is what makes one of the scariest dudes in UFC featherweight division. There was the first appearance of his signature GigaKick against the legend Cub Swanson. Giga allready made it to Top15 and is actively calling out one of my heroes, Max holloway',
//       {
//         draw: 0,
//         loses: 2,
//         wins: 13,
//       },
//       999
//     ),
//     new Fighter(
//       {
//         imageURL: 'https://scontent.ftbs6-1.fna.fbcdn.net/v/t1.6435-9/164579795_290090725841769_7705613756586375976_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=174925&_nc_eui2=AeFsNCrUU1MnLx4x5nVjJ1CWNPIq1HW93YY08irUdb3dhryLwULQjPlbIepBNK_plQq5ADvKIq3dA50eMqFnZwxr&_nc_ohc=RVDqX1PbDlYAX9jHqmQ&_nc_ht=scontent.ftbs6-1.fna&oh=1f54da79544bb8222853e6e9436a579a&oe=60E862B9',
//         name: 'Merab',
//         nickname: 'The Machine',
//         surname: 'Dvalishvili'
//       },
//       {
//         age: 30,
//         height: 167,
//         reach: 172.72,
//         weight: 61,
//       },
//       'THE MACHINE, as the "mmaJunkie" said, it\'s hard not to write his name in all caps. Merab is arguably the most relentless fighter there is, no one is able to keep up with his pace without paying a big price. Merab is currently in Top15 and has real chances to get the UFC Gold',
//       {
//         draw: 0,
//         loses: 4,
//         wins: 13,
//       },
//       999
//     ),
//     new Fighter(
//       {
//         imageURL: 'https://pbs.twimg.com/media/EkumjoFWAAIQS3k?format=jpg&name=small',
//         name: 'Guram',
//         nickname: 'The Georgian Viking',
//         surname: 'Kutateladze'
//       },
//       {
//         age: 29,
//         height: 180.34,
//         reach: 183,
//         weight: 70.31,
//       },
//       'Guram Kutateladze is not the most famous Georgian fighter as of now, but he surely is one of the most promising. Guram has a very violent style, is a knockout artist and a beast on the ground.',
//       {
//         draw: 0,
//         loses: 2,
//         wins: 12,
//       },
//       999
//     )
//   ]

//   toTheAuth() {
//     this.router.navigate(['signup']);
//   }
// }
