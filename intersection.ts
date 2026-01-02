type FileData = {
  path: string;
  content: string;
};
type Status = {
  isOpen: boolean;
  errorMessage?: string;
};
type DataBaseData = {
  connectionUrl: string;
  credentials: string;
};
type AccessFileData = FileData & Status; // INTERSECTION TYPE - combine these two; alternative with using Interfaces
type AccessDatabaseData = DataBaseData & Status;

// TYPE GUARDS
type FileSource = { path: string };
const fileSource: FileSource = {
  path: "some/path/to/file.csv",
};

type DBSource = { connectionUrl: string };
const dbSource: DBSource = {
  connectionUrl: "some-connection-url",
};

type Source = FileSource | DBSource;

function loadData(source: Source) {
  if ("path" in source) {
    // source.path; => use that to open the file
    return;
  }
  // source.connectionUrl; => to reach out to database
}

// TYPE GUARDS 2
type FileSource2 = { type: "file"; path2: string };
const fileSource2: FileSource2 = {
  type: "file",
  path2: "some/path/to/file.csv",
};

type DBSource2 = { type: "db"; connectionUrl2: string };
const dbSource2: DBSource2 = {
  type: "db",
  connectionUrl2: "some-connection-url",
};
type Source2 = FileSource2 | DBSource2;

function isFile(source: Source2) {
  // it returns Type Predicate
  return source.type === "file";
}

function loadData2(source2: Source2) {
  if (source2.type === "file") {
    // if (isFile(source)) -> now the Type Predicate can be used here
    source2.path2; // => use that to open the file
    return;
  }
  source2.connectionUrl2; // => to reach out to database
}

// TYPE GUARDS 3
class User {
  constructor(public name: string) {}
  join() {}
}
class Admin {
  constructor(public permissions: string) {}
  scan() {}
}
const user = new User("Max");
const admin = new Admin("Admin");

type Entity = Admin | User;
function init(entity: Entity) {
  if (entity instanceof User) {
    entity.join();
    return;
  }
  entity.scan();
}

// FUNCTION OVERLOADS
function getLength(val: string): string; // FUNCTION OVERLOADS
function getLength(val: any[]): number; // FUNCTION OVERLOADS

function getLength(val: string | any[]) {
  if (typeof val === "string") {
    // type guard
    const numOfWords = val.split(" ").length;
    return `${numOfWords} words`;
  }
  return val.length;
}

const numOfWords = getLength("Does it work?");
const numItems = getLength(["Sports", "Cookies", "bla"]);

// INDEX TYPES -> you can add as many properties/values as needed -> creating flexible obejct types
type DataStore = {
  [prop: string]: boolean | number;
};

// it exactly as with Record type
let someObj: Record<string, boolean | number>;

let store: DataStore = {};
store.id = 5;
store.isOpen = true;
// store.name = 'Max' -> can't be added cause it can have only boolean or number

// "AS CONST" TYPE - TS feature

let roles = ["admin", "guest", "editor"] as const; // with "as const" is readonly; you can't push() other values
const firstRole = roles[0];

// "satisfied" keyword

const dataEntries = {
  entry1: 32.2,
  entry2: 15.2,
} satisfies Record<string, number>; // mostly used with libraries/routing

dataEntries.entry1;
// dataEntries.entry3; -> TS checks if it is there

//-----------------GENERIC TYPES--------------------
let names = ["Max", "Anna"];
let names2: string[] = ["Max", "Anna"]; // its the same as above
let names3: Array<string> = ["Max", "Anna"]; // and this too - it uses generic type // some types working with other types - combos, building/descripting types, very flexbile -> it's an array full of strings = multiple types work together

//building own generic type
type NewDataStore = {
  [prop: string]: string;
};

let newStore: NewDataStore = {};
newStore.name = "BLA";
// newStore.isOpen = boolean; // can't so we can make it more flexible..

type NewDataStore2<T> = {
  // T = type for placeholder
  [prop: string]: T; // not other types can be used
};

let newStore2: NewDataStore2<string | boolean> = {}; //  now it's flexible
newStore2.name = "BLA";
newStore2.isOpen;

// GENERIC FUNCTIONS
function merge<T>(a: T, b: T) {
  return [a, b];
}
const ids = merge<number>(2, 3); // <number> - can be omitted

// MULTIPLE PLACEHOLDS FOR DIFFERENT TYPES
function merge2<T, K>(a: T, b: K) {
  return [a, b];
}
const ids2 = merge2(1, "Max");

// GENERIC AND CONSTRAINTS
function merge3<T extends object>(a: T, b: T) {
  return { ...a, ...b };
}
const merged = merge3({ userName: "Max" }, { age: 35 });
console.log(merged);

// GENERIC AND CONSTRAINTS = mutliple generic types
function merge4<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}
const merged2 = merge4({ userName: "Max" }, { age: 35 });
console.log(merged);

// GENERIC CLASSES
class User2<T> {
  constructor(public id: T) {}
}

const user2 = new User2("id1");

interface Role<T> {}

// NAMESPACES

/// <reference path="components/project-input.ts" />    // importing the file
namespace MyNameSpace {
  // sth, class, interface
}

// trzeba miec namespace o tej samej nazwie gdzie sie go wprowadza i wyprowadza

// ES MODULES
// import {sth} from ".../base-component.js" -- .js file extension is important if we don't webpack
// import * as Validation from.. -> group import. ! -> in the file which we export we need to add Validation.sth
// export default -> the whole (1 default export per file) 
