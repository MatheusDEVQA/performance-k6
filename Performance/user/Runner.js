import { group } from "k6"
import getUser from "./EndPoints/getUser.js"
import { SharedArray } from "k6/data"
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { setEnvironment } from "../../Helpers/SetEnvironment.js";
import { getRandomItem } from "../../Helpers/GetRandom.js";
import postUser from "./EndPoints/PostUser.js";

let configuration = setEnvironment();

const pageDataGet = new SharedArray('User List Pages', function () {
    return papaparse.parse(open(`../../Data/${__ENV.MY_ENV}/pages.csv`), { header: true }).data;
})

export const options = {
    userAgent: 'k6-matheus-qa',
    thresholds: {
        'http_req_duration{type:ReqGetUser}': ['avg < 800'],
        'http_req_duration{type:ReqPostUser}': ['avg< 800'],

        'http_reqs{type:ReqGetUser}': ['count > 0']
    },
    scenarios: {
        reqGetUser: {
            executor: 'ramping-arrival-rate',
            startRate: 1,
            exec: 'reqGetUser',
            timeUnit: '10s',
            preAllocatedVUs: 5,
            stages: [
                { target: 2, duration: '10s' },
                { target: 3, duration: '20s' }
            ]


        },
        reqPostUser: {
            executor: 'ramping-arrival-rate',
            startRate: 1,
            exec: 'reqPostUser',
            timeUnit: '5s',
            preAllocatedVUs: 5,
            stages: [
                { target: 2, duration: '10s' },
                { target: 3, duration: '5s' }
            ]
        }
    }
}

export function setup() {
    return configuration
}

export function reqGetUser(data) {
    group("ReqGetUser", function () {
        let userData = getRandomItem(pageDataGet)
        let pageData = userData.page
        console.log(pageData)
        getUser(data, pageData)
    })
}

export function reqPostUser(data) {
    group("Post User", () => {
        let pageData
        postUser(data, pageData)
    })
}
