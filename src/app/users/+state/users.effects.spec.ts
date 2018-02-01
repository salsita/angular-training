// import { TestBed } from '@angular/core/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { StoreModule } from '@ngrx/store';
// import { DataPersistence } from '@nrwl/nx';
// import { hot, readAll } from '@nrwl/nx/testing';
// import { UsersEffects } from './users.effects';

// describe('UsersEffects', () => {
//   const actions = null;
//   let effects: UsersEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [StoreModule.forRoot({})],
//       providers: [UsersEffects, DataPersistence, provideMockActions(() => actions)]
//     });

//     effects = TestBed.get(UsersEffects);
//   });

//   describe('someEffect', () => {
//     it('should work', async () => {
//       actions = hot('-a-|', { a: { type: 'LOAD_DATA' } });
//       expect(await readAll(effects.loadData)).toEqual([{ type: 'DATA_LOADED', payload: {} }]);
//     });
//   });
// });
