/**
* @name CopyRawEmbeds
* @displayName CopyRawEmbeds
* @source https://raw.githubusercontent.com/GR0SST/CopyRawEmbed/main/CopyRawEmbeds.plugin.js
* @authorId 371336044022464523
* @version 1.1.1
*/
/*@cc_on
@if (@_jscript)
	
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/
const request = require("request");
const fs = require("fs");
const path = require("path");


const config = {
    info: {
        name: "CopyRawEmbeds",
        authors: [
            {
                name: "GROSST",
                discord_id: "3713360440224645238",
            }
        ],
        version: "1.1.1",
        description: "Can copy any embed as a json",
        github: "https://github.com/GR0SST/CopyRawEmbed/blob/main/CopyRawEmbeds.plugin.js",
        github_raw: "https://raw.githubusercontent.com/GR0SST/CopyRawEmbed/main/CopyRawEmbeds.plugin.js",

    },
    changelog: [{
        title: "Channel logs",
        type: "fixed",
        items: [
            "Updated old links", "Update some stuff with embed colors"
            
        ]
    }],
    defaultConfig: []
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() {
        this._config = config;
    }

    getName() {
        return config.info.name;
    }

    getAuthor() {
        return config.info.authors.map(author => author.name).join(", ");
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    load() {
        BdApi.showConfirmationModal("Library plugin is needed",
            `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
            confirmText: "Download",
            cancelText: "Cancel",
            onConfirm: () => {
                request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", (error, response, body) => {
                    if (error) {
                        return require("electron").shell.openExternal("https://betterdiscord.app/plugin/ZeresPluginLibrary")
                    }

                    fs.writeFileSync(path.join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body);
                });
            }
        });
    }

    start() { this.load(); }

    stop() { }
} : (([Plugin, Library]) => {
    const { DiscordModules, WebpackModules, Patcher, DiscordContextMenu, Settings } = Library;
    const nums = /\d+/;
    class CopyRawEmbeds extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            this.patchTextAreaContextMenus();

        }

        onStop() {
            Patcher.unpatchAll();
        }
        copyToClipboard(text) {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        }
        renameKey(object, key, newKey) {
            const clone = (obj) => Object.assign({}, obj);
            const clonedObj = clone(object);
            const targetKey = clonedObj[key];
            delete clonedObj[key];
            clonedObj[newKey] = targetKey;
            return clonedObj;

        };
        patchTextAreaContextMenus() {
            const SlateTextAreaContextMenu = WebpackModules.find(m => m.default?.displayName === "MessageContextMenu");


            Patcher.after(SlateTextAreaContextMenu, "default", (thisObject, [props], returnValue) => {
                if (props.message.embeds[0] === undefined) return;
                returnValue.props.children.push(
                    DiscordContextMenu.buildMenuChildren([
                        {
                            type: "group",
                            items: [
                                {
                                    label: "CopyRawEmbeds",
                                    action: () => {
                                        let embed = props.message.embeds[0];
                                        embed = this.renameKey(embed, "rawDescription", "description")
                                        embed = this.renameKey(embed, "rawTitle", "title")


                                        delete embed.type;
                                        delete embed.url;
                                        delete embed.referenceId;
                                        delete embed.id;
                                        if (embed.author !== undefined) {
                                            delete embed.author.iconProxyURL
                                            embed.author = this.renameKey(embed.author, "iconURL", "icon_url")
                                        }

                                        if (embed.color !== undefined) {
                                            let hsl = embed.color.split(" ")
                                            let hue = hsl[0].match(nums)[0]
                                            let saturation = hsl[4].match(nums)[0]
                                            let lightness = hsl[5].match(nums)[0]
                                            let hex = this.HSLToDec(hue,saturation,lightness)
                                            embed.color = hex   
                                        }

                                        if (embed.footer !== undefined) {
                                            delete embed.footer.iconProxyURL
                                            embed.footer = this.renameKey(embed.footer, "iconURL", "icon_url")
                                        }
                                        if (embed.thumbnail !== undefined) {
                                            delete embed.thumbnail.proxyURL
                                            delete embed.thumbnail.width
                                            delete embed.thumbnail.height
                                        }
                                        if (embed.image !== undefined) {
                                            delete embed.image.proxyURL
                                            delete embed.image.width
                                            delete embed.image.height
                                        }

                                        if (embed.fields !== undefined) {
                                            let fields = embed.fields.map((e) => {
                                                let obj = {
                                                    name: e.rawName,
                                                    value: e.rawValue,
                                                    inline: e.inline
                                                }
                                                return obj
                                            })
                                            embed.fields = fields;
                                        }
                                        this.copyToClipboard(JSON.stringify(embed, null, '\t'))
                                        Library.Toasts.success("Embed copied")
                                    },
                                },
                            ],
                        },
                    ])
                );
            });

        }

        HSLToDec(h,s,l) {
            s /= 100;
            l /= 100;
          
            let c = (1 - Math.abs(2 * l - 1)) * s,
                x = c * (1 - Math.abs((h / 60) % 2 - 1)),
                m = l - c/2,
                r = 0,
                g = 0, 
                b = 0; 
          
            if (0 <= h && h < 60) {
              r = c; g = x; b = 0;
            } else if (60 <= h && h < 120) {
              r = x; g = c; b = 0;
            } else if (120 <= h && h < 180) {
              r = 0; g = c; b = x;
            } else if (180 <= h && h < 240) {
              r = 0; g = x; b = c;
            } else if (240 <= h && h < 300) {
              r = x; g = 0; b = c;
            } else if (300 <= h && h < 360) {
              r = c; g = 0; b = x;
            }
            // Having obtained RGB, convert channels to hex
            r = Math.round((r + m) * 255).toString(16);
            g = Math.round((g + m) * 255).toString(16);
            b = Math.round((b + m) * 255).toString(16);
            
            // Prepend 0s, if necessary
            if (r.length == 1)
              r = "0" + r;
            if (g.length == 1)
              g = "0" + g;
            if (b.length == 1)
              b = "0" + b;
              
            let hex = r + g + b
            return parseInt(hex, 16);
          }


    }

    return CopyRawEmbeds;
})(global.ZeresPluginLibrary.buildPlugin(config));
/*@end@*/
