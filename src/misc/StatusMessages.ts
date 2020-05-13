export const StatusMessage = new Map<number, string>([
    [401, 'Not Authorized, logout and login please'],
    [404, 'Not Found'],
    [422, 'Corrupted data specified'],
]);

export const getStatusMessage = (statusCode: number): string => {
    return (StatusMessage.has(statusCode) ? StatusMessage.get(statusCode) : `Unknown error, status: ${statusCode}`) as string;
}
