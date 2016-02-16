module.exports = function version() {
    return new Date().getTime().toString(32).substring(3, 12) + Math.random().toString(32).substring(3, 12);
}