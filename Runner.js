import { group } from "k6"
import { getUser } from './Performance/EndPoints/GetUser.js'

export const options = {
    userAgent: 'k6-matheus-qa',
    thresholds: {
        'http_req_durantion{type:ReqGetUser}': ['avg < 800'],
        'http_reqs{type:ReqGetUser}': ['count > 0']
    },
    scenarios: {
        reqGetUser: {
            executor: 'ramping-arrival-rate',
            statrtRate: 1,
            exec: 'ReqGetUser',
            timeUnit: '10s',
            preAllocatedVUs: 5,
            stages: [
                { target: 2, duration: '10s' },
                { target: 3, duration: '20s' }
            ]


        }
    }
}
export function ReqGetUser() {
    group("Get User", () => {
        getUser()
    })
}
