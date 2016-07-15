import { Model } from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

const falcor = new Model({
    source: new HttpDataSource('/model.json')
});

export default falcor;