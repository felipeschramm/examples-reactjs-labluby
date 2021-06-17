//Basic types-----------------------------------------------
let userName: string;

let usersNames: string[];
usersNames = ["a", "b"];

let isUser: boolean;

let ageUser: number;

let person: {
  name: string;
  age: number;
};

person = {
  name: "Max",
  age: 32,
};

let anything: any;

type Person = {
  name: string;
  age: number;
};

let people: Person[];

let numbers: Array<number> = [1, 2, 3];

//Type inference--------------------------------------------------

// let course:string = 'React'      redundante
let course = "React";

//course = 9    vai dar erro

let courseUnion: string | number = "React";
courseUnion = "e";
courseUnion = 9;

// Functions  & types-----------------------------------------------

function add(a: number, b: number) {
    return a+b;
}

function addWithReturnTypeDefined(a: number, b: number): string {
    return 'a';
}

function printOutput(value:any){
    console.log(value)
}

//Generics

function insertABeginning<T>(array:T[], value:T){
    const newarray = [value,...array]
    return newarray;
}

const demo = [1,2,3,4,5]

const updatedarray = insertABeginning(demo, 0)


