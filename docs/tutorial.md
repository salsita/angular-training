# Angular Tutorial Application

Hi! Welcome to our tutorial that will guide you through the creation of your (maybe) first Angular application.

## Checkpoint -1: basic theory

### TypeScript
- JavaScript + types = [TypeScript](http://www.typescriptlang.org/)

```TypeScript
const god = 'Miško Hevery'; // TS knows it's a string
const praiseGod = (godsName: string): string => {
  return `All hail ${godsName}!`;
};

praiseGod(god); // ok
praiseGod(42); // no way!
```

- ToDo: go through [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- you can read whole [Tutorial](https://www.typescriptlang.org/docs/handbook/basic-types.html) later

### Angular Basics
#### What's Angular
 - [Architecture overview](https://angular.io/guide/architecture)
 - [Cheat Sheet](https://angular.io/guide/cheatsheet)

#### Components

- templates are HTML based (no JSX)

```HTML
<body>
  <!-- custom HTML tag => Angular component -->
  <hello-world></hello-world>
</body>
```

- components are decorated classes
  - `@Component` decorator configures component, [API detail](https://angular.io/api/core/Component)

```TypeScript
@Component({
  selector: 'hello-world',
  template: '<h1>{{title}}</h1>'
})
class HelloWorldComponent {
  title = 'Hello World!'
}
```

- little info about decorators ([docs](http://www.typescriptlang.org/docs/handbook/decorators.html))
  - add metadata to decorated item (class/property/param)

#### Modules
- smallest compilation unit in Angular, can be lazy loaded
- should contain related Components (from the same feature)
  - `UsersListComponent` + `UserDetailComponent` + `UsersApiService` in one module

```TypeScript
@NgModule({
  imports:      [HttpClientModule], // import another module with all its components/services/...
  providers:    [Logger], // services provided by this module to other modules
  declarations: [AppComponent], // local components
  exports:      [AppComponent] // stuff available for other modules (except for services)
})
export class AppModule {}
```

#### Template syntax
- Angular uses HTML with custom tags/attributes
- ToDo: read [official documentation](https://angular.io/guide/template-syntax) later (basics that we discuss here are easy, but deep knowledge will help a lot!)
- in short:
  - loop: [*ngFor](https://angular.io/guide/template-syntax#ngforof)
  - conditional rendering: [*ngIf](https://angular.io/guide/template-syntax#ngif)
  - assign to an attribute [<tag [attr]="var">](https://angular.io/guide/template-syntax#attribute-class-and-style-bindings)
  - listen for events: [<tag (click)="func($event)">](https://angular.io/guide/template-syntax#event-binding---event-)
  - interpolate value: [{{var}}](https://angular.io/guide/template-syntax#property-binding-or-interpolation)
  - transform (pipe): [{{var | date}}](https://angular.io/guide/template-syntax#the-pipe-operator---)
  - safe access: [{{var?.attribute}}](https://angular.io/guide/template-syntax#the-safe-navigation-operator----and-null-property-paths)

```HTML
  <div *ngIf="ideas.length > 0">
    <span *ngFor="let idea of ideas">
      <img [src]="idea.image" />
      <span class="bold" [style.color]="idea.color">
        {{idea | uppercase}}
      </span>
      <button (click)="ifYouBelieveInYourselfEverythingIsPossible()">
        Let's Make It Happen!
      </button>
    </span>
  </div>
```

#### Services and dependency injection
- services defined as classes
- use [`@Injectable`](https://angular.io/api/core/Injectable) and add them to `@NgModule({ providers: [...] })` to make them available
- services are singletons (import services to `@NgModule` only once)
-  ([guide with examples](https://angular.io/guide/architecture-services))

```TypeScript
@Injectable()
class IdeasApiService {
  getIdeas(): Promise<any[]> {
    return fetchDataSomehow(...);
  }
}

@Component({...})
class IdeasComponent {
  ideas: any[];

  constructor(private api: IdeasApiService) {}
  async loadIdeas() {
    this.ideas = await this.api.getIdeas();
  }
}
```

### RxJS (Observables)
- they represent collection (similar to an Arrays) of values in the future (similar to Promises)

Example: multiply odd numbers by 2 and print them:
```TypeScript
const numbers = [1, 2, 3, 4, 5]
  .filter(number => number % 2)
  .map(number => number * 2);

numbers.forEach(number => console.log(number));  // logs 2, 6, 10
```

Now in RxJS:
```TypeScript
import { of, map } from 'rxjs';

const numbers = of(1, 2, 3, 4, 5).pipe(
  filter(number => number % 2),
  map(number => number * 2)
);

numbers.subscribe(number => console.log(number)); // logs 2, 6, 10
```

But in reality you'll have a stream of data:
```TypeScript
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const subject = new Subject();
const numbers$ = subject.pipe(
  filter(number => number % 2),
  map(number => number * 2)
);

// no data, logs nothing (similar to Promise)
numbers$.subscribe(number => console.log(number));

subject.next(1); // logs 2
subject.next(2);
subject.next(3); // logs 6

let i = 4;
setInterval(() => {
  subject.next(i++);
}, 1000);
```

- [Asynchronous Programming tutorial](https://egghead.io/courses/asynchronous-programming-the-end-of-the-loop)
- [Observables in Angular](https://angular.io/guide/observables-in-angular)

## Checkpoint 1: Hello Angular

Prerequisites:
- install [Node.js](https://nodejs.org/en/)
- install [Angular CLI](https://github.com/angular/angular-cli)
  - `npm install -g @angular/cli` (or use `yarn` if you're familiar with it)

Now we can generate our new project:
1) `ng new awesome-angular-tutorial --routing`
2) check `package.json` for available commands

... and [start coding like crazy!](http://i.imgur.com/u3lWw.gif)

Create new module with routing and one page:

3) Clean `src/app/app.component.html` (keep just the `<router-outlet>`)
4) create [@NgModule](https://angular.io/api/core/NgModule) for new feature module `UsersModule` in `src/app/users/users.module.ts` ([why?](https://angular.io/guide/styleguide#feature-modules)), setup routing (import [RouterModule.forChild](https://angular.io/api/router/RouterModule))
    - root URL route should render `UsersListComponent`
    - update `AppRoutingModule` in `src/app/app-routing.module.ts`:
      - lazy load `UsersModule` on `/users` ([guide](https://angular.io/guide/router#lazy-loading-route-configuration))
      - redirect unknown URLs to `/users` ([guide](https://angular.io/guide/router#configuration))
4) create `UsersListComponent` ([@Component](https://angular.io/api/core/Component)) files in `src/app/users/users-list/users-list.component.(ts|html)`
    - don't forget do add new `@Component` to `declarations` of our `UsersModule`
6) Add static list of users and render it in `UsersListComponents` in a table
    - `[{ firstName: 'John', lastName: 'Doe' }, ...]`

## Checkpoint 2 - Hello REST + forms

Prerequisites:
- add NPM dependencies
  - `npm install --save @ngrx/store` ([docs](https://github.com/ngrx/platform/tree/master/docs/store))
  - TODO: `@angular-training/(api|ngrx-helpers)`

Load list of users from REST API:

1) Import required `@NgModule`s to `AppModule`:
    - [StoreModule.forRoot({})](https://github.com/ngrx/platform/tree/master/docs/store) from `@ngrx/store` (dependency of `ApiModule`)
    - [HttpClientModule](https://angular.io/api/common/http/HttpClientModule) from `@angular/common/http` (our REST client)
    - `ApiModule` from `@angular-training/api` (it configures `HttpClientModule` for us)
```TypeScript
ApiModule.forRoot({
  baseUrl: 'http://private-e1fc4-reacttraining1.apiary-mock.com/api/v1',
  storeNamespace: 'api'
})
```
2) Import required `@NgModule`s to `UsersModule`:
    - [FormsModule](https://angular.io/api/forms/FormsModule) & [ReactiveFormsModule](https://angular.io/api/forms/ReactiveFormsModule) from `@angular/forms`
3) create `UsersApi` in `src/app/users/users.api.ts`
    - add `getUsers` method, that will use [HttpClient](https://angular.io/api/common/http/HttpClient) service to call HTTP GET `/users` ([guide](https://angular.io/guide/http))
    - don't forget to add new service to `providers` of `UsersModule`
4) inject `UsersApi` to `UsersListComponent` and use it to render list of users from the API (instead of static data from previous Checkpoint)
    - `HttpClient` returns `Observable`, get the data by calling `.subscribe()` or by `async` pipe ([API](https://angular.io/api/common/AsyncPipe))
    - [shape of /users JSON](http://private-e1fc4-reacttraining1.apiary-mock.com/api/v1/users/1)

Let's add another page with user detail:

4) add `getUser(id)` method to `UsersApi`, that will load user data from `/users/${id}`
5) add `getSkills()` method to `UsersApi`, that will load list of available skills from `/skills`
6) create `@Component` `UserFormComponent` in `src/app/users/users-form/users-form.component.(ts|html)`
    - use Angular decorators: `@Input()`, `@Output()` ([guide](https://angular.io/guide/component-interaction))
    - API of our new component: `<app-user-form [user]="user" [skills]="skills" (submit)="onSubmit($event)">`
    - render all user's fields (readonly - no form yet, [shape of /users JSON](http://private-e1fc4-reacttraining1.apiary-mock.com/api/v1/users/1)])
7) create `@Component` `UsersEditComponent` in `src/app/users/users-edit/users-edit.component.(ts|html)`
    - render `UserFormComponent` inside
    - get `id` parameter from `ActivatedRoute` ([API](https://angular.io/api/router/ActivatedRoute), hint: use `.snapshot`)
    - don't forget do add new `@Component`s to `declarations` of our `UsersModule`
8) add `/users/:id` route, render `UsersEditComponent` on it
9) add `routerLink` from `UsersListComponent` to `UserDetailComponent`  (`/:id`)

Now it's possible to see detail of an user. We should also make `UserFormComponent` editable (+ add new users)

10) add `/users/add` route, render `UsersEditComponent` on it
11) update `UserFormComponent` - render `<form>` inside
    - use Angular services: `FormBuilder` ([guide](https://angular.io/guide/reactive-forms#introduction-to-formbuilder))
12) add `saveUser()` method to `UsersApi`, that will fire HTTP POST with user data to `/users`
13) handle form submission in `UserDetailComponent` -> save user
    - use `saveUser()` method of `UsersApi` to send changed user data to server
    - after successful request, use router to navigate back to `/users` ([API](https://angular.io/api/router/Router))
    - `submit` event conflicts with DOM event, don't forget to stop its propagation

## Checkpoint 3 - Hello Resolver

Let's rewrite all data fetching to resolvers! ([guide](https://angular.io/guide/router#resolve-pre-fetching-component-data))

1) create `UsersListResolver` in `src/app/users/users-list/users-list.resolver.ts`
    - user `UsersApi` to load data
    - add this resolver to `/users` route instead of loading data in the component
    - get data in the compoment from `ActivatedRoute`
2) do the same with `UserResolver` in `src/app/users/user-edit/user.resolver.ts`
3) also add `SkillsResolver` in `src/app/users/skills/skills.resolver.ts` and use it everywhere you need list of skills
4) optimize routes configuration in `UsersModule` - skills should be loaded only once for the whole app

## Checkpoint 4 - Hello ~~Redux~~ ngrx

If you're already familiar with Redux, skip this section and then go straight to Checkpoint 5.

Very simplified steps:

1) create new project: `ng new ngrx-tutorial`
2) add libs:
    - `npm install --save @ngrx/store` ([docs](https://github.com/ngrx/platform/tree/master/docs/store))
    - `npm install --save @ngrx/effects` ([docs](https://github.com/ngrx/platform/tree/master/docs/effects))
    - `npm install --save @ngrx/store-devtools` ([docs](https://github.com/ngrx/platform/tree/master/docs/store-devtools))
5) implement simple counter component (with reducer & actions) to show how Redux architecture works
    - `INCREMENT` & `DECREMENT` actions
    - simple reducer that updates counter
    - use selectors to render data
6) create new effect that will negate your counter action with 1s delay
7) grab popcorn and watch [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

## Checkpoint 5 - Advanced ngrx

Prerequisites:
    - add NPM dependencies
      - `normalizr` ([readme](https://github.com/paularmstrong/normalizr))
      - `@ngrx/effects` ([docs](https://github.com/ngrx/platform/tree/master/docs/effects))
      - TODO `@angular-training/router` + `@ngrx/router-store` ([docs](https://github.com/ngrx/platform/tree/master/docs/router-store))

In the end we'll use `Crud`/`EntityRepository` modules to do the work for us so we won't need any store for our `UsersModule`, but to practice we'll implement this manually first.

1) little intro to `normalizr` ([readme](https://github.com/paularmstrong/normalizr))
2) look at the data ([shape of /users JSON](http://private-e1fc4-reacttraining1.apiary-mock.com/api/v1/users)) and prepare `normalizr` schemas for `skill`, `userSkill`, `user`
3) create `src/app/users/+state/users.actions.ts` with:
    - action types:
      - `ENTITIES_CHANGED`
      - `ROUTE_DATA_CHANGED`
    - action creators:
      - `entitiesChanged(entities: object | object[])`
      - `routeDataChanged(routeData: string | string[])`
3) create `UsersResolverService` in `src/app/users/users-resolver.service.ts`, it will help us with data normalization and storage
    - we'll use it in all resolvers
    - `contructor(store: Store)`
    - it has one method: `normalizeAndStore(entity: normalizr.schema.Entity, routeId: string, data: object | object[])`:
      - `normalirz` returns object `{ entities: ..., result: ... }`
      - dispatch `entities` in `ENTITIES_CHANGED` action
      - dispatch `result` and `routeId` (`normalizeAndStore`'s parameter) in `ROUTE_DATA_CHANGED` action
4) add reducer in `src/app/users/+state/users.reducer.ts`
    - save data from `ENTITES_CHANGED` & `ROUTE_DATA_CHANGED` actions
    - how should Users state look like
```JavaScript
{
  // normalized data
  entities: {
    users: {
      UID1: { firstName: 'John', ...}
    },
    skills: {
      SID2: { ... }
    }
  },
  // only IDs
  routeData: {
    // in general: [routeId]: ID1 | [ID1]
    usersList: [UID1, UID2],
    usersDetail: UID1,
    skills: [SID1, SID2]
  }
}
```

5) plug new reducer into `StoreModule.forFeature` in `UsersModule` ([docs](https://github.com/ngrx/platform/tree/master/docs/store))
6) prepare selectors for `routeData` ([docs](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md))
7) change resolvers use selectors in components to load stored data

We should also refactor how user is saved. The logic should not stay in `UserEditComponent`, but it should be moved to an effect. See `@ngrx/effects` ([docs](https://github.com/ngrx/platform/tree/master/docs/effects)).

8) add `UsersEffects` in `src/app/users/+state/users.effects.ts`
9) add new action `SAVE_USER` to `src/app/users/+state/users.actions.ts`
    - dispatch that action in `UserEditComponent` along with user data when user clicks on _Save_ button
    - catch that action in the effect, save user (use existing `UsersApi` service for that) and navigate to `/users`

## Checkpoint 6 - Rewrite

Let's refactor the app - use `CrudModule` & `EntityRepositoryModule` & `RouterModule` (from `@angular-training/router`).

Prerequisites:
- add NPM dependencies
  - TODO: `@angular-training/(crud|entity-repository|router)`

1) import all 3 modules to `AppModule`
2) rewrite all resolvers to use `CrudResolver` from `CrudModule`


# Quiz time! How would you... ?
1) render user names in `UsersListComponent` in UPPERCASE
2) render `UserEditComponent` as a popup above `UsersListComponent`


# Recomended links
- [Angular API](https://angular.io/api)
- [Angular Styleguide](https://angular.io/guide/styleguide)
- [Angular Cheat Sheet](https://angular.io/guide/cheatsheet)
- [Learn RxJS](https://www.learnrxjs.io/)
