import { UserProfile } from "./UserProfile";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    nick: state.auth.user.nick,
    mail: state.auth.user.mail,
    city: state.auth.user.city,
    urlPicture: state.auth.user.urlPicture
})

export const UserProfileContainer = connect(mapStateToProps)(UserProfile);