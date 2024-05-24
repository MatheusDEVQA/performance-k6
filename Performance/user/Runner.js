import { group } from "k6"
import getUser from "./EndPoints/getUser.js"
import { SharedArray } from "k6/data"
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { getRandomItem } from "../../Helpers/GetRandom.js";

const environment = 'staging'

const pageDataGet = new SharedArray('User List Pages', function (){
    return papaparse.parse(open(`../../Data/${environment}/pages.csv`), { header : true}).data;
})

export const options = {
    userAgent: 'k6-matheus-qa',
    thresholds: {
        'http_req_duration{type:ReqGetUser}': ['avg < 800'],

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


        }
    }
}
export function reqGetUser() {
    group("ReqGetUser", function () {
        let userData = getRandomItem(pageDataGet)
        let pageData = userData.page
        console.log(pageData)
        getUser(pageData)
    })
}
