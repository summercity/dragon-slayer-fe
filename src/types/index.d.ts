import { Reducer, Store } from "redux";
import { RouterState } from "connected-react-router";
// import { ContainerState as LanguageProviderState } from 'containers/LanguageProvider/types';
// import { ContainerState as AppState } from 'containers/App/types';
import { DefaultRootState } from "react-redux";
import { ContainerState as HomeState } from "../containers/HomePage/types";
import { ContainerState as DefaultState } from "containers/DefaultContainer/types";
import { ContainerState as LoginState } from "containers/DefaultContainer/types";
import { ContainerState as NotifState } from "../containers/Notifications/types";
import { ContainerState as UsersState } from "../containers/Users/types";
import { ContainerState as QueueState } from "../containers/Queue/types";
import { ContainerState as ArenaState } from "../containers/Arena/types";

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
  readonly default: DefaultState;
  readonly login: LoginState;
  readonly notification: NotifState;
  readonly users: UsersState;
  readonly queue: QueueState;
  readonly arena: ArenaState;
  // readonly language: LanguageProviderState;
  // readonly testContainer: TestContainerState;
  // for testing purposes
  readonly test: any;
}
