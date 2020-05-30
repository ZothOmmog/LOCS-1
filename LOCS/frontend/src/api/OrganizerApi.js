import { FetchInstance } from "./api";

const POST = 'POST';
const GET = 'GET';

class OrganizerApi extends FetchInstance {
    // __addUserInFriendsRoute = 'user/AddFriend';
    // __deleteUserFromFriendsRoute = 'user/DeleteFriend';
    // __acceptUserRoute = 'user/AcceptFriend';
    // __getFriendsRoute = (countUsers, currentPage) => `user/Friends/${countUsers}/${currentPage}`;
    // __getFriendRequestsInRoute = (countUsers, currentPage) => `user/FriendRequests/${countUsers}/${currentPage}`;
    // __getFriendRequestsOutRoute = (countUsers, currentPage) => `user/FriendRequestsSent/${countUsers}/${currentPage}`;
    __getMeOrgRoute = 'org/';
    __signUpRoute = 'org/registration';
    
    // __addUserInFriendsBody = (idUser) => ({ newFriend: idUser });
    // __deleteUserFromFriendsBody = (idUser) => ({ friend: idUser });
    // __acceptUserBody = (idUser) => ({ newFriend: idUser });
    __signUpBody = (info, orgName, orgLink, logoLink) => ({ 
        info: info, 
        organizationName: orgName, 
        organizationLink: orgLink,
        logo: logoLink
    });

    // addUserInFriends = (idUser) => this.go(POST, this.__addUserInFriendsRoute, this.__addUserInFriendsBody(idUser), true);
    // deleteUserFromFriends = (idUser) => this.go(POST, this.__deleteUserFromFriendsRoute, this.__deleteUserFromFriendsBody(idUser), true);
    // acceptUser = (idUser) => this.go(POST, this.__acceptUserRoute, this.__acceptUserBody(idUser), true);
    // getFriends = (countUsers, currentPage) => this.go(GET, this.__getFriendsRoute(countUsers, currentPage), null, true);
    // getFriendRequestsIn = (countUsers, currentPage) => this.go(GET, this.__getFriendRequestsInRoute(countUsers, currentPage), null, true);
    // getFriendRequestsOut = (countUsers, currentPage) => this.go(GET, this.__getFriendRequestsOutRoute(countUsers, currentPage), null, true);
    getMeOrg = () => this.go(GET, this.__getMeOrgRoute, null, true);
    signUp = (info, orgName, orgLink, logoLink) => this.go(
        POST, 
        this.__signUpRoute, 
        this.__signUpBody(info, orgName, orgLink, logoLink), 
        true
    );
}

export const organizerApi = new OrganizerApi();