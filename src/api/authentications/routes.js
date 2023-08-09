const routes = (handler) => [
	{
		method: "POST",
		path: "/authentications",
		handler: handler.postAuthenticationHanlder,
	},
	{
		method: "PUT",
		path: "/authentications",
		handler: handler.putAuthenticationHanlder,
	},
	{
		method: "DELETE",
		path: "/authentications",
		handler: handler.deleteAuthenticationHanlder,
	}
];

module.exports = routes;
