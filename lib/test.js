class A {
    method2 = () => {}
    attr1 = 2
}

class AB extends A {
    render() {}
    method2() {}
    attr1 = 4
}

class AC extends A {
    method1() {}
    attr1 = 3
    attr2 = 4
}

class ABC extends AB {
    render() {}
}