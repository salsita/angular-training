// import { TestBed } from '@angular/core/testing';
// import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { CustomRouterStateSerializer } from './router.serializer';

// describe('CustomRouterStateSerializer', () => {
//   let service: CustomRouterStateSerializer;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [CustomRouterStateSerializer]
//     });

//     service = TestBed.get(CustomRouterStateSerializer);
//   });

//   describe('serialize', () => {
//     it('should serialize router state', () => {
//       const url = 'http://localhost/';
//       const routeSnapshotData = {
//         params: { a: 1 },
//         queryParams: { b: 2 },
//         data: { c: 3 },
//         fragment: 'top'
//       };
//       const routeSnapshot = {
//         value: new ActivatedRouteSnapshot(),
//         children: []
//       };

//       Object.assign(routeSnapshot, routeSnapshotData);

//       const routerSnapshot = new RouterStateSnapshot(routeSnapshot);
//       routerSnapshot.url = url;

//       const result = service.serialize(routerSnapshot);
//       expect(result).toEqual({ ...routeSnapshotData, url });
//     });
//   });
// });
