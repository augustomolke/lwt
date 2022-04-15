import React from "react";

interface DBContextInterface {
  db: IDBDatabase | null;
}

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
) => React.FC;

type CreateDB = <T extends Record<keyof T, Collection>>(
  name: string,
  version?: number,
  colletions?: Collections<T>[]
) => IDBDatabase;

const DBContext = React.createContext<DBContextInterface>({ db: null });

const createDB: CreateDB = async (name, version, collections) => {
  const DBOpenRequest: IDBOpenDBRequest = indexedDB.open(name, version);

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

  const db = (await DBOpenRequest).result;

  return db;
};

export const useIndexedDB: DB = (name, version, collections) => {
  const db = createDB(name, version, collections);
  const Provider = React.useMemo(() => {
    const context = { db };

    const DatabaseProvider: React.FC = ({ children }) => {
      return (
        <DBContext.Provider value={context}>{children}</DBContext.Provider>
      );
    };

    return DatabaseProvider;
  }, [db]);

  return Provider;
};

export const useInsert = () => {
  const { db } = React.useContext(DBContext);

  if (db) {
    console.log(db);
    // db.transaction("Words", "readwrite").objectStore("Words").add({
    //   word: "test",
    //   status: "status",
    // });
  }
};
const output = { useIndexedDB, useInsert };
export default output;
