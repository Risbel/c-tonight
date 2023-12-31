import httpService from "@/config/axios.config";

const getPermissionsByDiscoRole = async (roleId: string): Promise<PermissionsByDiscoRoles[]> => {
  const response = await httpService.get(`/rolesPermissionsResources/permissions/${roleId}`);
  return response.data;
};

export default getPermissionsByDiscoRole;

export interface PermissionsByDiscoRoles {
  name: string;
  permissionId: string;
}
