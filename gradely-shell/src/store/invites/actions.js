import { $serviceApi as api } from "@/services/service-api";

const routes = {
    invite_user: '/invite/invite-user',
    class_invite_details: '/invite/get-invite-class/',
    check_contact_availability: '/invite/confirm-availability/'
};

export default {
    async inviteNewUser(_, invitation) {
        return await api.newService("old").push(routes.invite_user, invitation);
    },

    async classInviteDetails(_, token) {
        return await api.newService("old").fetch(routes.class_invite_details + token);
    },

    async checkContactAvailability(_, { token, user_id }) {
        return await api.newService("old").fetch(routes.check_contact_availability + token + '?user_id=' + user_id);
    },

}