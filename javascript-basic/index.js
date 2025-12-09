// const users = [
//   { name: '태희', age: 23 },
//   { name: '민수', age: 27 },
//   { name: '지영', age: 31 },
// ];

// const ageAverage = ()=>{
//   const total = users.reduce((acc, user)=> acc + user.age, 0)
//   return Math.floor(total/users.length)
// }

// console.log(ageAverage());


// numbers 배열에서
// 짝수만 골라서 제곱한 다음,
// 그 제곱값들의 합계를 구하라.

// const numbers = [1, 2, 3, 4, 5, 6];

// const aaa = ()=>{
//   const result = numbers.filter((x)=>
//   x % 2 === 0).map((x)=>
//   x ** 2).reduce((acc, number)=>
//     acc + number
//   , 0)
//   return result;
// }

// console.log(aaa());

// const sumEvenOdd = () => {
//   const result = numbers.reduce((acc, num) => {
//     if (num % 2 === 0) {
//       acc.evenSum += num; // 짝수는 evenSum에 누적
//     } else {
//       acc.oddSum += num;  // 홀수는 oddSum에 누적
//     }
//     return acc; // 누적객체 반환
//   }, { evenSum: 0, oddSum: 0 }); // 초기값 객체로 지정

//   return result;
// };

// console.log(sumEvenOdd());


//아래 배열에서 과일별 개수를 세서 객체 형태로 반환하라.

// const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

// const result = fruits.reduce((acc, fruit)=>{
//   acc[fruit] = (acc[fruit] || 0 ) + 1;
//   return acc;
// }, {})

// console.log(result);


//문자열 알파벳 개수 세기

// const word = 'banana';

// const letters = word.split('')
// const result = letters.reduce((acc, letter)=>{
//   acc[letter] = (acc[letter] || 0) + 1
//   return acc;
// }, {})

// const result = [...word].reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {});

// console.log(result)


//문장에서 단어 첫 글자만 대문자로 바꾸는 함수를 만들어봐.

// const sentence = "hello my name is taehee";

// const result = sentence.split(' ').map((word)=> word[0].toUpperCase() + word.slice(1)).join(' ')

// console.log(result)

// for( let i = 0; i<=5; i++ ){
//   setTimeout(()=>{
//     console.log(i);
//   }, i * 1000);
// }

// console.log(printEven())


//다음 배열에서 가격이 3000원 이상인 상품만 걸러내는 함수를 만들어봐 👇

const items = [
  { name: "Bread", price: 2500 },
  { name: "Cake", price: 4000 },
  { name: "Coffee", price: 3000 },
  { name: "Cookie", price: 1500 }
];

const sellFilter = ()=> items.filter( x=> x.price >= 3000 )


console.log(sellFilter());

//문자열 "apple,banana,grape,peach" 를 받아서
// 아래처럼 이모지 + 과일 이름 배열로 바꾸는 함수를 만들어봐 🍎👇

//["🍎 apple", "🍌 banana", "🍇 grape", "🍑 peach"]


// 주어진 문장에서 가장 긴 단어를 찾아서 출력하는 함수를 만들어봐 👇

const sentence = "Front-end development is really fun";

const LongLength = ()=>{
  const word = sentence.split(' ')


}