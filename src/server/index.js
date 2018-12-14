import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import chalk from 'chalk';

import * as utils from './utils';

console.log(chalk.blue("== Server is loading =="));

const dev = (process.env.NODE_ENV || 'development') === 'development';

const start = (options) => {
    return new Promise((resolve, reject) => {
        if (!options)
            reject(new Error('The server must specify a port!'));

        /*
		 *   Server Startup
		 */
        const app = express();
        if (dev) app.use(morgan('dev'));
        app.use(helmet());
        app.use(cors());

        /*
         *   Server Parsers
         */
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		/*
		*  	General
		*/

		// catch 404
		app.use(function(req, res, next) {
			var err = new Error('Not Found');
			err.status = 404;
			next(err);
		});

		// error handler
		app.use(function(err, req, res, next) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = dev ? err : {};
			res.status(err.status || 500).send();
        });    
        
        const server = http.createServer(app);
        const normalizedPort = utils.normalizePort(options.port);
        server.listen(normalizedPort);

        server.on('error', utils.onError);
        server.on('listening', () => {
            resolve(server);
        })
    });
}

export default { start }