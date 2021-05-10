const dotenv        = require('dotenv');
/*ENV CONFIG */
dotenv.config();
/*ENV CONFIG */


const express       = require('express');
const moment        = require('moment');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const flash         = require('connect-flash');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const cookieSession = require('cookie-session');
const compression   = require('compression');

const app           = express();
const PORT = process.env.PORT || 8080;



/*LOGGER CONFIG*/
app.use(logger(function (tokens, req, res) {
	return [
		moment().format('LLL'),
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms'
	].join(' ')
}));
/*LOGGER CONFIG*/


/*EXPRESS APP JSON CONFIG*/
app.use(flash());
app.use(compression());
app.use(bodyParser.json({limit:"500mb"}));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 }));
/*EXPRESS APP JSON CONFIG*/


/*COOKIES CONFIG*/
app.use(cookieParser());
app.use(
	cookieSession({
		name: 'session',
		keys: ['key1'],
		maxAge: 24 * 60 * 60 * 1000,
	})
);
/*COOKIES CONFIG*/

/*CORS CONFIG */
app.use(
	cors({
		origin: '*',
	})
);
/*CORS CONFIG */



/*ROUTES*/
const adminRouter = require('./views/adminRoutes');
const blogRouter = require('./views/blogRoutes');
const commentRouter = require('./views/commentRoutes');
const forgotPassRouter = require('./views/forgotPassRoutes');
const userRouter = require('./views/userRoutes');
app.use('/',userRouter);
app.use('/',adminRouter);
app.use('/',blogRouter);
app.use('/',commentRouter);
app.use('/',forgotPassRouter)
/*ROUTES*/


app.listen(PORT,function (){
	console.log("Server listening on port",process.env.PORT);
})