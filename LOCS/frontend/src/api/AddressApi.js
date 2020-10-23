import { FetchInstance } from "./api";

const POST = 'POST';

class AddressApi extends FetchInstance {
    __searchAddressRoute = 'org/searchAddress';

    __searchAddressBody = word => ({ word });

    search = (word) => this.go(POST, this.__searchAddressRoute, this.__searchAddressBody(word), false);
}

export const addressApi = new AddressApi();