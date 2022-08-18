const jwt = require ('jsonwebtoken');

const getToken = (userId) => { 
	return jwt.sign({ userId: userId }, process.env.SECRET_TOKEN, {expiresIn: '30d'}) 
};

// VERIFICAR TOKEN. Solo devuelve true o false 
const verifyToken = (token) => {
	const verificationStatus = jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
		if (err) return false
		return true
	})
	return verificationStatus
};

// OBTENER INFO DEL TOKEN. Te devuelve la info que este dentro del token. De momento solo el userId
const getDataToken = async (token) => {
	const decodedInfoToken = await jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
		if (err) {
			return {
				isValid: false,
				error: err
			}
		 } else {
			return {
				isValid: true,
				userId: decoded.userId,
				
				Token: decoded.token
			}
		 }
	})
	return decodedInfoToken;
};



		const authenticate = async (req, res, next) => {
			const token = req.headers.authorization;
			const {userId} = await getDataToken(token);
			try {
			{
			  res.locals.userId = userId;
			  console.log("local",  res.locals)
			  next();
			}
		} catch (error) {
			return res.status(404).send(`Authentication failed: ${error.message}`);
		}
	};


			/*    console.log(req.headers)
			Leemos todas las cabezas guardadas en la req
			const token = req.headers.authorization
			console.log(token)
			se creo una variable apra visualizar la autothorizacion del token
			const isvalid = getDataToken(token);
			console.log(isvalid)
			se verifica el token y se descodifica 
				if (!isvalid){
				res.status(500)
			} else{
				res.status(200)
			};
			si es correcto nos pinta un ok 200 o un error 500
			const user_id = await isvalid.userId; */

module.exports = {
	getToken,
	verifyToken,
	getDataToken,
	/* getReadToken, */
	authenticate,
}