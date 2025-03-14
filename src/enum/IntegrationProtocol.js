"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationProtocol = void 0;
// IntegrationProtocol.ts
var IntegrationProtocol;
(function (IntegrationProtocol) {
    IntegrationProtocol["RABBITMQ"] = "rabbitmq";
    IntegrationProtocol["WEBHOOK"] = "webhook";
    IntegrationProtocol["NONE"] = "none";
})(IntegrationProtocol || (exports.IntegrationProtocol = IntegrationProtocol = {}));
