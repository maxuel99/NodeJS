"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = __importDefault(require("./lib/prisma/client"));
const app = (0, express_1.default)();
app.get("/planets", async (request, response) => {
    const planets = await client_1.default.planet.findMany();
    response.json(planets);
});
exports.default = app;
//# sourceMappingURL=app.js.map