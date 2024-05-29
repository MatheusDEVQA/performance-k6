import http from "k6/http";
import { check, fail } from "k6";

const payload = JSON.parse(open('../../../Model/user/body.json'))

export default function (configuration, pageData) {


    let requestBody = JSON.stringify(payload)
    requestBody.replace(/{{name}}/g, "matheus")
    requestBody.replace(/{{job}}/g, "qa engineer")

    const url = `${configuration.baseUrl}`

    const params = {
        /* headers: {
             'Authorization': 'Bearer token',
             'Content-Type': 'application/json'
 
         }*/
        tags: { type: "ReqPostUser" }
    }
    let res = http.post(url, requestBody, params)

    console.log(res.body)

    const success = check(res, {
        'Is 201 to get User': (r) => r.status === 201,
        'Is success to create user': (r) => r.body.localeCompare('response_body')
    },
        {
            type: "ReqPostUser"
        }
    )

    if (!success) fail(`status code was *not* 201, was ${res.status}`)
}
