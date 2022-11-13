export class ApplicationStorage {
  private _persistentStorage: Storage;
  private _sessionStorage: Storage;
  private _stateName = "applicationState";

  constructor(
    persistentStorage = localStorage,
    sessStorage = sessionStorage,
    extra?: { stateName: string }
  ) {
    this._persistentStorage = persistentStorage;
    this._sessionStorage = sessStorage;
    this._stateName = extra?.stateName || this._stateName;
  }

  public setItem<T>(value: T, extra: { persistent?: boolean }) {
    const storage = extra.persistent
      ? this._persistentStorage
      : this._sessionStorage;

    storage.setItem(this._stateName, JSON.stringify(value));
  }

  public getItem<T>(): T | undefined {
    const persistentState = this._persistentStorage.getItem(this._stateName);
    const sessionState = this._sessionStorage.getItem(this._stateName);

    const rawState = sessionState || persistentState;

    if (rawState) {
      try {
        return JSON.parse(rawState || "");
      } catch (e) {
        console.error("Can't parse value from state: '%s'", rawState);
      }
    }
  }

  public removeItem() {
    [this._persistentStorage, this._sessionStorage].forEach((storage) =>
      storage.removeItem(this._stateName)
    );
  }
}
