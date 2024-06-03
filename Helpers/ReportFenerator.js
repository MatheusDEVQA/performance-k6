import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export function GenerateReport(data, options){    
    let time = new Date().toISOString().replace(/:/g, '-');
    let name = 'test';
    if(options.tags){
        let object = Object.keys(options.tags);
        let firstItem = object[0];
        name = options.tags[firstItem];
    }
    const reportFilename = `${name}__${time.split('.')[0]}.html`;    

    return {
        'stdout': textSummary(data, { indent: " ", enableColors: true }),
        [`./Results/${reportFilename}`]: htmlReport(data),
    };
}