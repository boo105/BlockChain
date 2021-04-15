// interface 는 자바스크립트에서 동작안함
interface Human 
{
    name : string;
    age : number;
    gender : string;
}

class Human2 
{
    public name : string;
    public age : number;
    public gender : string;
    
    constructor(name:string, age:number, gender:string)
    {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const person = {
    name : "강민호",
    gender : "male",
    age : 22
};

const lynn = new Human2("Lynn",18,"female");

const name = "강민호",  age = 24, gender = "male";

// ? 를 붙임으로 인해서 선택적으로 매개변수를 줄수있음
const sayHi = (name : string,age : number,gender? : string) : string => {
    return `Hello ${name}, you are ${age}, you are ${gender}!`;
};

// ? 를 붙임으로 인해서 선택적으로 매개변수를 줄수있음
const sayHi2 = (person : Human) : string => {
    return `Hello ${person.name}, you are ${person.age}, you are ${person.gender}!`;
};

// ? 를 붙임으로 인해서 선택적으로 매개변수를 줄수있음
const sayHi3 = (person : Human2) : string => {
    return `Hello ${person.name}, you are ${person.age}, you are ${person.gender}!`;
};

console.log(sayHi(name,age));
console.log(sayHi("강민호", 444, "male"));
console.log(sayHi2(person));

export {};