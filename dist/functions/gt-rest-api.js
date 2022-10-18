"use strict";
/**
 * These functions provide easy access to the REST API endpoints, with type-safety.
 * Not all of these have been tested to their fullest, instead have been constructed based on provided examples.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMap = exports.getMap = exports.getSpace = exports.createSpace = void 0;
const axios_1 = __importDefault(require("axios"));
//These endpoints taken from the Gather.town Notion documentation
const API_KEY = process.env.API_KEY;
const createSpace = async (spaceName, spaceTemplateURL, spaceReason) => {
    const urlParser = spaceTemplateURL.split("/");
    const { status, data } = await (0, axios_1.default)({
        method: "POST",
        url: "https://api.gather.town/api/v2/spaces",
        data: {
            name: spaceName,
            sourceSpace: [urlParser[4], urlParser[5]].join("\\"),
            reason: spaceReason,
        },
        headers: {
            apiKey: API_KEY,
        },
    });
    return `https://app.gather.town/app/${data}`;
};
exports.createSpace = createSpace;
const getSpace = async (spaceURL) => {
    const urlParser = spaceURL.split("/");
    const { status, data } = await (0, axios_1.default)({
        method: "GET",
        url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent([urlParser[4], urlParser[5]].join("\\"))}`,
        headers: {
            apiKey: API_KEY,
        },
    });
    return data;
};
exports.getSpace = getSpace;
const getMap = async (spaceURL, mapID) => {
    const urlParser = spaceURL.split("/");
    const { status, data } = await (0, axios_1.default)({
        method: "GET",
        url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent([urlParser[4], urlParser[5]].join("\\"))}/maps/${encodeURIComponent(mapID)}`,
        headers: {
            apiKey: API_KEY,
        },
    });
    return data;
};
exports.getMap = getMap;
const setMap = async (spaceURL, mapID, newMapData) => {
    const urlParser = spaceURL.split("/");
    const { status, data } = await (0, axios_1.default)({
        method: "GET",
        url: `https://api.gather.town/api/v2/spaces/${encodeURIComponent([urlParser[4], urlParser[5]].join("\\"))}/maps/${encodeURIComponent(mapID)}`,
        data: {
            content: {
                newMapData,
            },
        },
        headers: {
            apiKey: API_KEY,
        },
    });
};
exports.setMap = setMap;
