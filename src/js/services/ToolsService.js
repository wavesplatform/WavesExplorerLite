import {ApiClientService} from './ApiClientService';

export class ToolsService extends ApiClientService {
    constructor(configurationService, networkId) {
        super(configurationService, networkId);
    }

    loadTools = () => {
        const tools = this.configuration().tools.slice();

        const promises = tools.map((tools, index) => {
                const newTool = {
                    ...tools,

                };

                return {
                    index,
                    tool: newTool
                };

        });

        return Promise.all(promises).then(values => {
            values.forEach(item => {
                tools[item.index] = item.tool;
            });

            return tools;
        });
    }
}
