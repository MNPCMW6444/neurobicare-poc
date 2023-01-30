import { Observable } from "rxjs";

const storeObservabler = (store: any) => {
  return new Observable((observer) => {
    // emit the current state as first value:
    observer.next(
      store.getState().muse.museReadings[
        store.getState().muse.museReadings.length - 1
      ]
    );
    const unsubscribe = store.subscribe(function () {
      // emit on every new state changes
      observer.next(
        store.getState().muse.museReadings[
          store.getState().muse.museReadings.length - 1
        ]
      );
    });
    // let's return the function that will be called
    // when the Observable is unsubscribed
    return unsubscribe;
  });
};

export default storeObservabler;
