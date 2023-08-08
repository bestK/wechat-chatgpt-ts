import eWelink from "ewelink-api";


export class EwelinkStateMgr {
    connection: eWelink | undefined
    loginInfo: import("ewelink-api").LoginInfo | undefined
    devices: import("ewelink-api").Device[] | undefined;
    socket: any;


    constructor(connection: eWelink) {
        this.connection = connection
    }

}