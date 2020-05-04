import { UserProfile } from "./UserProfile";
import { connect } from "react-redux";
import { logoutMeThunk } from "../../redux/authReducer";
import { withAuthRedirect } from "../../hoc/indexHoc";

const mapStateToProps = (state) => ({
    nick: state.auth.user.nick,
    mail: state.auth.user.mail,
    city: state.auth.user.city,
    urlPicture: state.auth.user.urlPicture
})

export const UserProfileContainer = withAuthRedirect(connect(mapStateToProps, { logoutMeThunk })(UserProfile), false);