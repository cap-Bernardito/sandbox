function sayHello() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        window.console.log('❤️');
    } else if (window.console) {
        window.console.log('❤️');
    }
}
module.exports = sayHello;