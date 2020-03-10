import { Reducer, Store } from "redux";
import { RouterState } from "connected-react-router";
// import { ContainerState as LanguageProviderState } from 'containers/LanguageProvider/types';
// import { ContainerState as AppState } from 'containers/App/types';
import { ContainerState as HomeState } from "../containers/HomePage/types";
// import { ContainerState as TestContainerState } from 'containers/TestContainer/types';

// From template
// export interface InjectedStore extends Store {
//   injectedReducers: any;
//   injectedSagas: any;
//   runSaga(
//     saga: (() => IterableIterator<any>) | undefined,
//     args: any | undefined
//   ): any;
// }

// Edited
export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga: any;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly router: RouterState;
  readonly global: AppState;
  readonly home: HomeState;
  // readonly language: LanguageProviderState;
  // readonly testContainer: TestContainerState;
  // for testing purposes
  readonly test: any;
}
