"use strict"

// this指向问题， 箭头函数没有this对象，只能调用上级this，依次向上查找
const person = {
    name: 'tom',

    getName: () => {
        console.log(this)  // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
        return this.name  // ""
    }
}
person.getName()


const person = {
    name: 'tom',
    getName: function () {
        console.log(this)  //{name: "tom", getName: ƒ} 
        return this.name  // 'tom'
    }
}

person.getName()


const person = {
    name: 'tom',
    getName: function () {
        setTimeout(() => {
            console.log(this)
            return this.name
        }, 1000)
    }
}

person.getName()



// 3.模板字符串
const a = 20;
const b = 30;
// const string = `$+$=$`;
const string = `${a}+${b}=${a + b}`;
// 模板字符串支持换行功能
const breakWord = `${a}+${b}
                    =${a + b}`;




// 4.解析结构
// 对象解析结构，对象根据属性名一一对应，这是一个无序的对应关系
const props = {
    className: 'tiger-button',
    loading: false,
    clicked: true,
    disabled: 'disabled'
}
const { loading, clicked } = props
console.log(loading)
console.log(clicked)


export { default } from './Button';  //button import 出来一个对象， export 可以以解析结构形式引入想要使用的方法

// 数组解析结构，数组以序列号一一对应，这是一个有序的对应关系
const arr = [1, 2, 3]
const [a, b, c] = arr
console.log(a)
console.log(b)
console.log(c)

// 数组以序列号一一对应，这是一个有序的对应关系。
// 而对象根据属性名一一对应，这是一个无序的对应关系。
// 根据这个特性，使用解析结构从对象中获取属性值更加具有可用性。 *****



// 5.函数默认值
function add(x = 20, y = 30) {
    return x + y;
}

console.log(add());

// 传递的参数也可以是一个对象
const defaultProps = {
    className: 'tiger-button',
    loading: false,
    clicked: true,
    disabled: 'disabled'
}
function dx(props = defaultProps) {
    console.log(props.className);
}
dx();  //使用默认参数
const cz = {
    className: 'mokey-button',
    loading: true,
    clicked: true,
    disabled: 'disabled'
}
dx(cz)



// 6.展开运算符  ...
// 将数组或者对象进行展开
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 5, 6, 7];

const obj1 = {
    a: 1,
    b: 2,
    c: 3
}
const obj2 = {
    ...obj1,
    d: 4,
    e: 5,
    f: 6
}


// 这种方式在react中十分常用
const props = {
    size: 1,
    src: 'xxxx',
    mode: 'si'
}

const { size, ...others } = props;

console.log(others)  //{src: "xxxx", mode: "si"}

// 然后再利用暂开运算符传递给下一个元素，再以后封装react组件时会大量使用到这种方式，正在学习react的同学一定要搞懂这种使用方式
//    <button {...others} size= />


// 展开运算符还用在函数的参数中，来表示函数的不定参。只有放在最后才能作为函数的不定参，否则会报错
const add = (a, b, ...more) => {
    return more.reduce((total, currentValue) => {
        console.log(total)
        return total + currentValue
    }) + a + b
}

console.log(add(1, 23, 1, 2, 3, 4, 5)) // 39



// 对象字面量和 class
const courseId = 12;
const props = {
    courseId: courseId   // ：左边的是变量名，右边的 courseId是对象字面量，字面量和变量名相同的话可以简写成一个下边形式；
}
const props = {
    courseId  // 简写形式，当属性与值的变量同名时
}

// 例如：
const name = 'Jane';
const age = 20

// es6
const person = {
    name,
    age
}

// es5
var person = {
    name: name,
    age: age
};



// 那么这种方式在任何地方都可以使用，比如在一个模块对外提供接口时
const getName = () => person.name;
const getAge = () => person.age;

// commonJS的方式
module.exports = { getName, getAge }

// ES6 modules的方式
export default { getName, getAge }



// 除了属性之外，对象字面量写法中的方法也可以有简写方式
// es6
const person = {
    name,
    age,
    getName() { // 只要不使用箭头函数，this就还是我们熟悉的this，此处只是简写形式不是箭头函数
        return this.name
    }
}

// es5
var person = {
    name: name,
    age: age,
    getName: function getName() {
        return this.name;
    }
};




// 在对象字面量中可以使用中括号作为属性，表示属性也能是一个变量了。
const name = 'Jane';
const age = 20

const person = {
    [name]: true,
    [age]: true
}




// class
class Person {
    constructor(name, age) { // 构造函数
        this.name = name;
        this.age = age;
    }

    getName() { // 这种写法表示将方法添加到原型中
        return this.name
    }

    static a = 20; // 等同于 Person.a = 20

    c = 20; // 表示在构造函数中添加属性 在构造函数中等同于 this.c = 20

    // 箭头函数的写法表示在构造函数中添加方法，在构造函数中等同于this.getAge = function() {}
    getAge = () => this.age   //this当前是箭头函数 是没有this 找最近的上层的 function，直到最外层的windows

}