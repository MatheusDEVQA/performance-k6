import Address from "./address.js"

export default class Body {
    constructor(name, age, cpf){
        this.name = name
        this.cpf = cpf
        this.age = age
        this.Address = new Address
        this.alias = "test_string_fixed"
    }
}
