const mapping: Record<string, string> = {
  organizations: 'organization',
  tutorials: 'tutorial',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
