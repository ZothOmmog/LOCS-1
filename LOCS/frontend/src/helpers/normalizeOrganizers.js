export const normalizeOrganizers = organizersFromServer => organizersFromServer ? organizersFromServer.map(org => ({
    id: org.searchorg.id_user,
    logo: org.searchorg.logo,
    name: org.searchorg.organization_name
})) : null;
