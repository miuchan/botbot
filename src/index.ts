import "reflect-metadata";
import * as path from 'path';
import { createConnection } from "typeorm";
import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { ConfigService } from './service/ConfigService';

const configService = Container.get(ConfigService);
const config: { port: number, host: string } = configService.config.listen

createConnection().then(async () => {
    
    useContainer(Container);
    
    const app = createKoaServer({
        controllers: [
            path.resolve(__dirname, "./controller/*Controller.ts"),
        ]
    })

    app.listen(config.port, config.host);

    console.log(`Server running on port ${config.port}`);
}).catch(error => console.log(error));
