# BetterDiscordStuff
BD plugins and themes i use
**i did not make any of these except the custom css**

### **Don't** Use All Of The Plugins!!!!
it will work but discord will be borderline unusable 

paste the contents of [customcss.css](customcss/customcss.css) into the customcss tab of better discord an **not** themes

have fun :)


# Plugins 
# AccountDetailsPlus - [Download](https://betterdiscord.app/Download?id=31)
Lets you view popout, nickname and more from your account panel at the bottom.

## Demo
![demo](https://camo.githubusercontent.com/5e5e72180db1f35319388aef8e6d3fe65168fb6fd03b3c6824a7b8f9bc9a0256/68747470733a2f2f692e696d6775722e636f6d2f5a5068676f72722e676966)

## Instructions
Left click avatar or username for popout
Right click avatar or username for status picker
Hover to change from nickname to username
## Settings
Enable/Disable popout for avatar/username
Enable/Disable status picker on right click
Swap between displaying nickname or username
Enable/Disable swapping username and nickname on hover

# In App Notifications - [Download](https://betterdiscord.app/Download?id=173)
Displays notifications such as new messages, friends added in Discord.
### Preview
![preview](https://camo.githubusercontent.com/60722f61ecd05ae41cf62344a17676034112f42c997fb1bc22a6c9f3198d5a72/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3832343938353639373034373933373032342f3834313730383332313238373330373237342f756e6b6e6f776e2e706e67)

# AssignBadges - [Download](https://betterdiscord.app/Download?id=336)
Allows you to locally assign badges to users through the user context menu.
Made with  by [BDBuilder](https://github.com/Kyza/bdbuilder)

# AutoStartRichPresence
Automatically starts a custom Rich Presence application when you start Discord. Now with support for multiple rich presence profiles!

Donate:

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/lucariodev)

Setup Tutorial: https://www.youtube.com/watch?v=JIUOreTNj-o

![Example](https://camo.githubusercontent.com/0705d3755e88acc0a01ff803108cfcda925d447230f18ad2ae8a07fefe750a21/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3434343639393532313339383836353934332f3435393433323339333539383536363432302f756e6b6e6f776e2e706e67)

My Discord server: https://nebula.mooo.info/discord-invite

DM me `@Lucario ☉ ∝ x²#7902` or create an issue at https://github.com/Mega-Mewthree/BetterDiscordPlugins for support.

## Troubleshooting
###"Rich Presence client ID authentication failed. Make sure your client ID is correct."
Check your client ID in the plugin settings to make sure that it matches the client ID for your Rich Presence app in your Discord Applications page.
Close Discord, then open the Task Manager (or whatever process manager your OS has) and force kill any remaining Discord processes. Sometimes, Discord orphans some processes for unknown reasons and it messes with IPC.
Your computer was not connected to the Internet when the plugin started. Make sure you are connected to the Internet and restart the Discord client.
### "Failed to set Rich Presence activity."
You have another application running that has its own Rich Presence, which is conflicting with this plugin. Close all other applications that use Rich Presence and restart the Discord client.
Your computer was not connected to the Internet when the plugin started. Make sure you are connected to the Internet and restart the Discord client.
Ensure that your button labels are less than 32 characters long. The button URLs should not be excessive in length. Test with https://example.com.
### Images do not appear.
Wait 24 hours. Discord may take a while to process your images.
### The Rich Presence is not showing 10 seconds after it was started, and there are no visible errors.
Make sure the plugin is on.
Go to User Settings > Game Activity and turn on Display currently running game as a status message. If it was already on, turn it off, wait 5 seconds, and turn it back on.
Disable the experimental RPC event injection setting if you have it enabled, and restart Discord.
Wait 3 hours while your Discord client is continuously open. Sometimes, Discord may take a long time to display or update your Rich Presence.
### Buttons do nothing when clicked on.
The Discord client does not allow clicking your own buttons. Ask someone else to test them, or use an alternate account.
### None of these solutions work.
Send me a DM or ping me in the BD support server in the #plugins channel. Due to excessive DMs from people who can't bother to read this troubleshooting guide, I will only respond if you include the phrase "Mago Berry" in your message along with details about your problem and what you have attempted to do in order to solve it (do not just copy and paste my troubleshooting steps).
