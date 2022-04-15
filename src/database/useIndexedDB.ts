import React from "react";

interface Collection {
  key?: string;
  collectionName: string;
  schema: Record<string, unknown>;
}

interface Collections<T> {
  collectionName: keyof T;
  key?: string;
}

type DB = <T extends Record<keyof T, Collection>>(
  name: string,
  version?: number,
  colletions?: Collections<T>[]
) => IDBOpenDBRequest;

export const useIndexedDB: DB = (name, version, collections) => {
  const DBOpenRequest = React.useMemo(
    () => indexedDB.open(name, version),
    [name, version]
  );
  DBOpenRequest.addEventListener("success", (event) => {
    console.log("success", event);
  });

  DBOpenRequest.addEventListener("error", (err) => {
    console.warn(err);
  });

  DBOpenRequest.addEventListener("upgradeneeded", (event) => {
    const oldVersion = event.oldVersion;
    const newVersion = event.newVersion || DBOpenRequest.result.version;

    console.log(`Database updated from version ${oldVersion} to ${newVersion}`);

    if (collections && collections.length > 0) {
      collections.forEach((collection) => {
        const collectionName = collection.collectionName as string;

        if (DBOpenRequest.result.objectStoreNames.contains(collectionName)) {
          DBOpenRequest.result.deleteObjectStore(collectionName);
        }

        if (!DBOpenRequest.result.objectStoreNames.contains(collectionName)) {
          DBOpenRequest.result.createObjectStore(collectionName, {
            autoIncrement: !!collection.key,
            ...(!!collection.key && { keyPath: collection.key }),
          });
        }
      });
    }
    console.log("upgradeneeded", event);
  });

  return DBOpenRequest;
};

const output = { useIndexedDB };
export default output;
