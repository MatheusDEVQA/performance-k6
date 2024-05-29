export function setEnvironment() {
    if (typeof (__ENV.MY_ENV) === "undefined") {
        __ENV.MY_ENV = "staging";
    } else __ENV.MY_ENV = __ENV.MY_ENV.toLowerCase();

    var configuration = JSON.parse(open(`../../Config/${__ENV.MY_ENV}/${__ENV.MY_ENV}.json`));

    return configuration;
}