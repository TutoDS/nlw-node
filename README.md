<h1 align="center" style="font-weight: 300">NodeJS <strong>NLW-04</strong></h1>
<div align="center">
	<a href="#"><img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" /></a> <a href="#"><img src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge" alt="ExpressJS"/></a> <a href="#"><img src="https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a> <a href="#"><img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VS Code" /></a>
</div>

<h2 style="font-weight:300">Commands:</h2>

-   `yarn dev`: Start server in dev. mode;

<h2 style="font-weight: 300">Changes:</h2>

-   Use `.env` file to set server port **<small>(classe 1 - 22/02/21)</small>**;
    -   **Note:** `.env.example` contains an example of `.env` file.
-   Create `environment.ts` file (in `/src/configs`) to access data from `.env` file **<small>(classe 1 - 22/02/21)</small>**;
-   Add **Husky _Hooks_** to run **Prettier** and format code in _pre-commit_ **<small>(classe 1 - 22/02/21)</small>**;
-   Custom structure in `src/routes` **<small>(classe 1 - 22/02/21)</small>**;
    -   **Note:** I use on file per controller, example: `UserController` I have `users.routes`, where `users.routes` contains all routes related with users.

<h3 style="font-weight: 300">Problems with Husky Hooks</h3>

If **Husky _Hook_** pre-commit not working, try run this command: `npx mrm lint-staged `
