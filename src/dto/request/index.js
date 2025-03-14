"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// dto/request/index.ts
__exportStar(require("./StoreRequest"), exports);
__exportStar(require("./ProductRequest"), exports);
__exportStar(require("./AlternateIdentifierRequest"), exports);
__exportStar(require("./SkuRequest"), exports);
__exportStar(require("./FileRequest"), exports);
__exportStar(require("./IntegrationEventRequest"), exports);
__exportStar(require("./IntegrationRequest"), exports);
__exportStar(require("./AttributeRequest"), exports);
__exportStar(require("./AttributeTermRequest"), exports);
