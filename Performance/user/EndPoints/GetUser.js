import http from "k6/http";
import { check, fail } from "k6";

export default function (configuration, pageData) {
    
    const url = `${configuration.baseUrl}?page=${pageData}`

    const params = {
       /* headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'

        }*/
        tags: {type: "ReqGetUser"}
    }
    let res = http.get(url, params)

    const success = check(res,{ 
        'Is 200 to get User': (r) => r.status === 200,
        'Is success to search user': (r) => r.body.localeCompare('response_body')
    },
    {
        type: "ReqGetUser"
    }
    )

    if(!success) fail(`status code was *not* 200, was ${res.status}`)
}
