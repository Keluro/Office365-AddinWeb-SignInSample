# A sample that leverages the technicalities of SignIn for Outlook Web Add-ins and Multi-tenant Office 365 Web apps.

## What is provided by this sample

- An Office add-in may need access to Office 365. These new Office "web" add-ins are web apps. The proper way to do this is through [Azure AD](https://azure.microsoft.com/en-us/documentation/articles/active-directory-whatis/). As explained in this [blog post](https://blogs.msdn.microsoft.com/richard_dizeregas_blog/2015/08/10/connecting-to-office-365-from-an-office-add-in/) we may need a popup to achieve this. To overcome this problem Microsoft created the [dialogApi](https://channel9.msdn.com/Shows/Office-Dev-Show/Office-Dev-Show-Episode-26-Using-the-Dialog-API-in-Office-Add-ins). This sample aims at providing a functional solution that uses the **dialogApi** when available and the popup/SignalR technique as a fallback.

- You application may not need simply an Outlook add-in but also a standalone Office 365 web app. This is the case for **Keluro - Smart Email Sharing** where we have the [add-in](https://store.office.com/en-us/app.aspx?assetid=WA104380149&ui=en-US&rs=en-US&ad=US&appredirect=false) and the [web-app](https://store.office.com/en-us/app.aspx?assetid=SA000000070&ui=en-US&rs=en-US&ad=US&appredirect=false). This sample shows a way to share the authentication scheme.

- Some situations are handled in this sample. Especially, when you switch accounts with the add-in the account your are logged in with Outlook may not be the same as the one your authenticated with the web app.
![Web app](Docs/mailbox3.jpg)

- Most of the new Extension point provided for Outlook add-ins are supported. Such as the [Outlook Modules](http://dev.office.com/docs/add-ins/outlook/extension-module-outlook-add-ins), we display the web app in modules. 

- You can see how the Azure Graph API can be requested. See method *GetMailUserInfo()* in class **ConnectedUserProvider.cs**


## Two Single Page applications served by Asp.net

In this sample there are two Single Page Applications (written with Angular.js 1): the add-in and the web app. The server side code is written in C#/ASP.NET (both MVC and WebAPI)
![Web app](Docs/web-app.jpg)
![Addin](Docs/addin.png)

## Technical information

- [Get started with local environment (and the default Azure AD web app provided by Keluro)](Docs/GetStarted.md).
- [How to register my own Azure AD application for this.](Docs/MyOwnAzureAD.md)

This is an overview of what is implemented: we use a basic ASP.NET cookie for the authentication between application server and the clients. We request the APIs by using ADAL and a token saved in our SQL Server database.

![Addin](Docs/architecture.png)
