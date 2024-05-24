import http from "k6/http";
import { check, fail } from "k6";

export default function () {
    const url = 'https://reqres.in/api/users?page=2'

    const params = {
       /* headers: {
            'Authorization': 'Bearer token',
            'Content-Type': 'application/json'

        }*/
        tags: {type: "ReqGetUser"}
    }
    let res = http.get(url, params)
    
    const success = check(res,{ 
        'Is 200 to get User': (r) => r.status === 200
    },
    {
        type: "ReqGetUser"
    }
    )

    if(!success) fail(`status code was *not* 200, was ${res.status}`)
}