//arrays!
let numbers = [10, 12, 14, 15, 39];
let names = ["Bob", "Peter", "Mom", "Mary", "Ann", "Jerry"];

//accessing values
console.log(numbers[2]);
console.log(`${names[0]} is ${numbers[0]}.`);

numbers.forEach((value, index)=>{
    let newNum = numbers[index] + 1;
    numbers[index] = newNum;
    console.log(`${value} + 1 = ${numbers[index]}`);
});


//object!
//  -variables within an object are called properties
//  -objects can also have functions as properties
let person = {
    firstName: "Zoey", //person.firstName
    lastName: "Lee", //person.lastName
    occupation: "Founder", //person.occupation
    email: "hithere@gmail.com",
    getName: ()=>{
        console.log(`My name is + ${this.firstName}  :)`);
    }
}

console.log(person.firstName);
person.getName;

//JSON does not store functions. only key va;ues

let navBarData = {
    brand: {
        name: "Miami Travel Site", //data.brand.name
        link: "/",
        img: "/images/logo.png"
    },
    links: [
       {
        text: "Home",
        href: "/",
       },
       {
        text: "Night Life",
        href: "/nightlife",
       },
       {
        text: "Beaches",
        href: "/beaches",
       },
       {
        text: "About",
        href: "/about",
       },

    ],
}
