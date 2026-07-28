export async function handleServerAction<T>(
    action: () => Promise<T>,
    errorResponse: T | string = "Something went wrong."
): Promise<T> {
    try {
        return await action();
    } catch (error) {
        console.error(error);
        return errorResponse as T;
    }
}