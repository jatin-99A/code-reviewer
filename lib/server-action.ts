export async function handleServerAction<T>(
    action: () => Promise<T>,
    message = "Something went wrong."
): Promise<T> {
    try {
        return await action();
    } catch (error) {
        console.error(error);
        throw new Error(message);
    }
}