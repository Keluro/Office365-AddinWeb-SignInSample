# A sample that leverages the technicalities of Sign-In for Outlook Web Add-ins and Multi-tenant Office 365 Web apps.

## What is provided by this sample

- An Office add-in may need access to Office 365 APIs and identity. The new Office "web" add-ins are web apps, the proper way to do this is through an [Azure AD](https://azure.microsoft.com/en-us/documentation/articles/active-directory-whatis/) registration. As explained in this [blog post](https://blogs.msdn.microsoft.com/richard_dizeregas_blog/2015/08/10/connecting-to-office-365-from-an-office-add-in/), we may need a popup to achieve this. To overcome this problem Microsoft created the [dialogApi](https://channel9.msdn.com/Shows/Office-Dev-Show/Office-Dev-Show-Episode-26-Using-the-Dialog-API-in-Office-Add-ins). This sample provides a functional solution using the **dialogApi** when available and the popup/SignalR technique as a fallback.

*NEW: it looks like this is changing, check this [stackoverflow question](http://stackoverflow.com/questions/39897772/dialogapi-in-office-add-ins-available-for-all-hosts).*

- Your solution may not be simply just the Outlook add-in but also a standalone web app secured by Office 365 and Azure AD. This is the case for **Keluro - Smart Email Sharing** where we have the [add-in](https://store.office.com/en-us/app.aspx?assetid=WA104380149&ui=en-US&rs=en-US&ad=US&appredirect=false) and the [Office 365 web-app](https://store.office.com/en-us/app.aspx?assetid=SA000000070&ui=en-US&rs=en-US&ad=US&appredirect=false). This sample shows a way to share the authentication scheme for a better user experience.

- Some situations are handled in this sample: for example, the following one. When you login/logoff with different accounts, you can end up with a situation where the add-in the identity your are logged in with Outlook may not match the one your authenticated with the Office 365 web app. The sample handles this (see screenshot).

<img src="Docs/mailbox3.jpg" width="400">

- Most of the new Extension point provided for Outlook add-ins are supported. Such as the [Outlook Modules](http://dev.office.com/docs/add-ins/outlook/extension-module-outlook-add-ins), we display the web app in modules. 

- You can see how the Azure Graph API can be requested. See method *GetMailUserInfo()* in class **ConnectedUserProvider.cs**

This [documentation page](http://dev.office.com/docs/add-ins/develop/auth-external-add-ins) is also interesting.

## Comparison with other samples
Our objective is not to compete with other samples but we try to bring solutions for problems not already addressed by others.

- [Doug Perkes sample](https://github.com/dougperkes/Office-Add-in-AspNetMvc-ServerAuth) 
This sample works with many social logins and is not Outlook specific. It uses the SignalR approach only and does not use the dialogAPI. The server side technology is ASP.NET MVC.

- [Office Js Helpers](https://github.com/OfficeDev/office-js-helpers)
Similarly to Doug Perkes, it is not limited to Azure AD and is an authentication for many OAUTH social logins. It is based on the dialogAPI but do not have a fallback solution when not available. It is a very "light weight" sample no server side logic.
*Edit: the authors told me that they are implementing a fallback solution, it will be probably based on popup polling (it is the only possibility because it is server-less)*. See my blog post [on popup polling for add-ins](http://benoitpatra.com/2015/05/28/implementing-the-oauth-2-0-flow-in-app-for-office-sandboxed-environment/).

- [Office-Add-in-Nodejs-ServerAuth](https://github.com/OfficeDev/Office-Add-in-Nodejs-ServerAuth)
We did not review completely this sample but the approach looks similar to the one used in Doug Perkes sample. The server technology is Node.

- [PowerPoint-Add-in-Microsoft-Graph-ASPNET-InsertChart](https://github.com/OfficeDev/PowerPoint-Add-in-Microsoft-Graph-ASPNET-InsertChart)
This sample is specific to Powerpoint and Azure AD (accessing the Graph API). It uses dialogAPI without fallback logic. Server side technology is ASP.NET MVC.

## Two Single Page applications served by Asp.net

In this sample there are two Single Page Applications (written with Angular.js 1): the add-in and the web app. The server side code is written in C#/ASP.NET (both MVC and WebAPI)

<img src="Docs/web-app.jpg" width="400">
<img src="Docs/addin.png" width="400">


## Technical information

- [Get started with local environment (and the default Azure AD web app provided by Keluro)](Docs/GetStarted.md).
- [How to register my own Azure AD application for this.](Docs/MyOwnAzureAD.md)

The following picture is an overview of how the sample works when run locally from your dev machine. We use a basic ASP.NET cookie for the authentication between application server and the clients. We request the APIs by using [ADAL](https://azure.microsoft.com/en-us/documentation/articles/active-directory-authentication-libraries/) and a token saved in our SQL Server database.

![Addin](Docs/architecture.png)
